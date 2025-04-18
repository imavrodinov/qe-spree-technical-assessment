// generate a short random string useful for creating assertable test data
export function generateRandomString(): string {
  return [...Array(7)]
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join("");
}
