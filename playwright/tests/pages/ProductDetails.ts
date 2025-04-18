import { Page } from "@playwright/test";

export class ProductDetailsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProductSize(size: string) {
    await this.page.getByRole("button", { name: "Please choose Size" }).click();
    await this.page.locator("label").filter({ hasText: size }).click();
  }
  async clickAddToCartButton() {
    await this.page.getByRole("button", { name: "Add To Cart" }).click();
  }
}
