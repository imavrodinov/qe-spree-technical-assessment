import { Page } from "@playwright/test";
import { CardDetails } from "../utils/cardDetails";
import { expect } from "@playwright/test";

export class PaymentPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCheckOption() {
    await this.page.getByRole("link", { name: "Check" }).click();
  }

  async fillInCardDetails(validCard: CardDetails) {
    await this.page
      .getByRole("textbox", { name: "Card Number" })
      .fill(validCard.number);
    await this.page
      .getByRole("textbox", { name: "Expiration Date" })
      .fill(validCard.expiryDate);
    await this.page
      .getByRole("textbox", { name: "CVV" })
      .fill(validCard.cvvCode);
  }
  async fillInCardholderNames(names: string) {
    await this.page.getByRole("textbox", { name: "Name on card" }).fill(names);
  }
  async clickPayButton() {
    // this.mockPayment();
    await this.page.getByRole("button", { name: "Pay" }).click();
  }

  // not sure what's missing, route passes but takes me to cart
  async mockPayment() {
    await this.page.route("**/checkout/**/update/payment", async (route) => {
      const url = new URL(route.request().url());
      const pathSegments = url.pathname.split("/");
      const orderToken = pathSegments[2];

      const redirectTo = `http://localhost:3000/checkout/${orderToken}/complete`;

      await route.fulfill({
        status: 303,
        headers: {
          "Content-Length": "0",
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
          location: redirectTo,
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-XSS-Protection": "0",
        },
        body: "",
      });
    });
  }

  async assertPaymentSuccessful() {
    await expect(this.page.getByText("Status Paid")).toBeVisible();
  }
  async assertOrderTotalPriceMatchesContents(
    orderPrice: number,
    shippingPrice: number
  ) {
    let totalOrderPrice = (orderPrice + shippingPrice).toString();
    await expect(
      this.page.locator("#checkout_summary").getByText(totalOrderPrice)
    ).toBeVisible();
  }
  async assertCheckOrderConfirmed() {
    await expect(this.page.getByText("Your order is confirmed!")).toBeVisible();
  }
}
