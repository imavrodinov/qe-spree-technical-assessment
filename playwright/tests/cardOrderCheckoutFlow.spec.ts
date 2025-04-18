import { authUser as test } from "./fixtures/auth";
import { testProducts } from "./utils/testProducts";
import { ProductsPage } from "./pages/products";
import { ProductDetailsPage } from "./pages/ProductDetails";
import { CartPage } from "./pages/Cart";
import { CheckoutPage } from "./pages/Checkout";
import { userAddress } from "./utils/address";
import { DeliveryPage } from "./pages/Delivery";
import { deliveryMethods } from "./utils/deliveryMethods";
import { PaymentPage } from "./pages/Payment";
import { validCard } from "./utils/cardDetails";

test.describe("Test scenarios with signed in user created via API", () => {
  test("can pass full order and card payment flow using registered user", async ({
    authenticatedPage,
  }) => {
    const productsPage = new ProductsPage(authenticatedPage);
    const productDetailsPage = new ProductDetailsPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);
    const checkoutPage = new CheckoutPage(authenticatedPage);
    const deliveryMethod = new DeliveryPage(authenticatedPage);
    const paymentDetails = new PaymentPage(authenticatedPage);

    await productsPage.goToProductsPage();
    await productsPage.selectItem(testProducts.testShirtItem.name);
    await productDetailsPage.selectProductSize(testProducts.testShirtItem.size);
    await productDetailsPage.clickAddToCartButton();
    await cartPage.clickCheckoutButton();

    await checkoutPage.fillInAddressDetails(userAddress);
    await checkoutPage.saveAddressDetails();

    await deliveryMethod.chooseDeliveryMethod("upsGround");
    await deliveryMethod.saveDeliveryMethod();
    await paymentDetails.fillInCardDetails(validCard);
    await paymentDetails.clickPayButton();
    await paymentDetails.assertPaymentSuccessful();

    await paymentDetails.assertOrderTotalPriceMatchesContents(
      testProducts.testShirtItem.price,
      deliveryMethods.upsGround.price
    );
  });
});
