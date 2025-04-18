import { Page, APIResponse } from "@playwright/test";

export class WishlistPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToWishlist() {
    await this.page.goto("/account/wishlist");
  }

  async addItemToCart() {
    await this.page.getByRole("button", { name: "Add To Cart" }).click();
  }

  async addWishlistItemViaApi(itemId: number): Promise<APIResponse> {
    const response = await this.page.request.post(
      "/account/wishlist/wished_items",
      {
        form: {
          "wished_item[variant_id]": itemId,
        },
      }
    );

    if (!response.ok()) {
      throw new Error(
        `Failed to add item to wishlist. Status: ${response.status()}`
      );
    }

    return response;
  }
}
