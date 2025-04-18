import { Page } from "@playwright/test";

export class ProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToProductsPage() {
    await this.page.goto("/products");
  }

  async selectItem(itemname: string) {
    await this.page.getByRole("link", { name: itemname }).click();
  }
}
