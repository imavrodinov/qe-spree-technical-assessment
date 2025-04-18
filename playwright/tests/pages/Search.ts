import { Page } from "@playwright/test";

export class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openSearchBar() {
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async searchForItem(itemName: string) {
    await this.page.getByRole("textbox", { name: "Search" }).fill(itemName);
  }
}