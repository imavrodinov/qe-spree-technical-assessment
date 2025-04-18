import { Page } from "@playwright/test";
import { AddressDetails } from "../utils/address";
import { generateRandomString } from "../utils/common";

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInEmailAddress() {
    const randomEmail = `${generateRandomString()}@example.com`;
    await this.page.getByRole("textbox", { name: "Email" }).fill(randomEmail);
  }

  async fillInAddressDetails(userAddress: AddressDetails) {
    await this.page.getByLabel("Country").selectOption(userAddress.country);
    await this.page
      .getByRole("combobox", { name: "State" })
      .selectOption(userAddress.state);
    await this.page
      .getByRole("textbox", { name: "First Name" })
      .fill(userAddress.firstName);
    await this.page
      .getByRole("textbox", { name: "Last Name" })
      .fill(userAddress.lastName);
    await this.page
      .getByRole("textbox", { name: "Address", exact: true })
      .fill(userAddress.addressLine1);
    await this.page
      .getByRole("textbox", { name: "City" })
      .fill(userAddress.city);
    await this.page
      .getByRole("textbox", { name: "Zip Code" })
      .fill(userAddress.zip);
    await this.page
      .getByRole("textbox", { name: "Phone" })
      .fill(userAddress.phone);
  }

  async saveAddressDetails() {
    await this.page.getByRole("button", { name: "Save and Continue" }).click();
  }
}
