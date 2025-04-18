import { APIRequestContext } from "@playwright/test";
import fs from "fs/promises";
import path from "path";

export async function createAndLoginUser(
  request: APIRequestContext,
  userData: { email: string; password: string },
  storageFilePath: string = path.resolve(__dirname, "../storage/user.json")
): Promise<string> {
  // API request to create a new user
  const signupPage = await request.get("/users/sign_up");
  const signupHtml = await signupPage.text();
  const signupToken = extractAuthenticityToken(signupHtml);

  await request.post("/users", {
    form: {
      authenticity_token: signupToken,
      "user[email]": userData.email,
      "user[password]": userData.password,
      "user[password_confirmation]": userData.password,
      commit: "Sign Up",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // API login with the new user
  const loginPage = await request.get("/users/sign_in");
  const loginHtml = await loginPage.text();
  const loginToken = extractAuthenticityToken(loginHtml);

  const loginRes = await request.post("/users/sign_in", {
    form: {
      authenticity_token: loginToken,
      "user[email]": userData.email,
      "user[password]": userData.password,
      "user[remember_me]": "0",
      commit: "Login",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (![200].includes(loginRes.status())) {
    throw new Error(`User login failed: ${loginRes.status()}`);
  }
  // store authenticated state
  const state = await request.storageState();
  await fs.mkdir(path.dirname(storageFilePath), { recursive: true });
  await fs.writeFile(storageFilePath, JSON.stringify(state, null, 2));

  return storageFilePath;
}

function extractAuthenticityToken(html: string): string {
  const match = html.match(/name="authenticity_token" value="([^"]+)"/);
  if (!match || !match[1]) {
    throw new Error("authenticity_token not found");
  }
  return match[1];
}
