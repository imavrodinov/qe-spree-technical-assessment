import { Page } from "@playwright/test";
import { deliveryMethods, DeliveryMethodsKey } from "../utils/deliveryMethods";

export class DeliveryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async chooseDeliveryMethod(deliveryMethod: DeliveryMethodsKey) {
    const optionLabel = deliveryMethods[deliveryMethod].name;
    await this.page.getByRole("radio", { name: optionLabel }).click();
  }
  async saveDeliveryMethod() {
    await this.page.getByRole("button", { name: "Save and Continue" }).click();
  }
}
