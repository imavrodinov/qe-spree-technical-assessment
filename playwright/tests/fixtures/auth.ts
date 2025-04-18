import { test as base, BrowserContext, Page } from "@playwright/test";
import { createAndLoginUser } from "../utils/createUser";
import { generateRandomString } from "../utils/common";
import path from "path";

type AuthFixtures = {
  authenticatedPage: Page;
  authContext: BrowserContext;
  userEmail: string;
};

const authUser = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser, request }, use) => {
    const email = `user${Date.now()}@example.com`;
    const storagePath = path.resolve(__dirname, "../storage/user.json");

    await createAndLoginUser(
      request,
      {
        email,
        password: generateRandomString(),
      },
      storagePath
    );

    const context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();

    await use(page);
    await context.close();
  },

  authContext: async ({ browser }, use) => {
    const storagePath = path.resolve(__dirname, "../storage/user.json");
    const context = await browser.newContext({ storageState: storagePath });
    await use(context);
    await context.close();
  },

  userEmail: async ({}, use) => {
    const email = `user${Date.now()}@example.com`;
    await use(email);
  },
});

export { authUser };
