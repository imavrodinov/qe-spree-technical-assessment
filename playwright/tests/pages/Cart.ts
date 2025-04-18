import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigatetoCartPage() {
    await this.page.goto("/cart");
  }

  async closeCartSidebar() {
    await this.page.getByRole("button", { name: "Close sidebar" }).click();
  }
  async clickCheckoutButton() {
    await this.page.getByRole("link", { name: "Checkout" }).click();
  }
  async assertItemInCart(cartItem: string) {
    await expect(
      this.page.getByRole("listitem").filter({ hasText: cartItem })
    ).toBeVisible();
  }
}
