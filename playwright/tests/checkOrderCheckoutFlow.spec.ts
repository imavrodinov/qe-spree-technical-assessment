import { authUser as test } from "./fixtures/auth";
import { testProducts } from "./utils/testProducts";
import { CartPage } from "./pages/Cart";
import { CheckoutPage } from "./pages/Checkout";
import { userAddress } from "./utils/address";
import { DeliveryPage } from "./pages/Delivery";
import { deliveryMethods } from "./utils/deliveryMethods";
import { PaymentPage } from "./pages/Payment";
import { WishlistPage } from "./pages/Wishlist";

test.describe("Test scenarios with signed in user created via API", () => {
  test("can order wishlist items and order via check as registered user", async ({
    authenticatedPage,
  }) => {
    const cartPage = new CartPage(authenticatedPage);
    const checkoutPage = new CheckoutPage(authenticatedPage);
    const deliveryMethod = new DeliveryPage(authenticatedPage);
    const paymentDetails = new PaymentPage(authenticatedPage);
    const wishlist = new WishlistPage(authenticatedPage);

    await wishlist.addWishlistItemViaApi(testProducts.testJacketItem.id);

    await wishlist.goToWishlist();
    await wishlist.addItemToCart();

    await cartPage.clickCheckoutButton();

    await checkoutPage.fillInAddressDetails(userAddress);
    await checkoutPage.saveAddressDetails();

    await deliveryMethod.chooseDeliveryMethod("upsOneDay");
    await deliveryMethod.saveDeliveryMethod();

    await paymentDetails.selectCheckOption();
    await paymentDetails.clickPayButton();

    await paymentDetails.assertCheckOrderConfirmed();

    await paymentDetails.assertOrderTotalPriceMatchesContents(
      testProducts.testJacketItem.price,
      deliveryMethods.upsOneDay.price
    );
  });
});
