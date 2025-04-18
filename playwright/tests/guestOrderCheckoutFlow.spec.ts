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
import { SearchPage } from "./pages/Search";

test.describe("Test scenarios with guest users", () => {
  test("can search order items from the store via card without registration", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const deliveryMethod = new DeliveryPage(page);
    const paymentDetails = new PaymentPage(page);
    const search = new SearchPage(page);

    await productsPage.goToProductsPage();

    await search.openSearchBar();
    await search.searchForItem(testProducts.testTshirtItem.name);

    await productsPage.selectItem(testProducts.testTshirtItem.name);
    await productDetailsPage.selectProductSize(
      testProducts.testTshirtItem.size
    );
    await productDetailsPage.clickAddToCartButton();
    await cartPage.clickCheckoutButton();

    await checkoutPage.fillInEmailAddress();
    await checkoutPage.fillInAddressDetails(userAddress);
    await checkoutPage.saveAddressDetails();

    await deliveryMethod.chooseDeliveryMethod("upsGround");
    await deliveryMethod.saveDeliveryMethod();
    await paymentDetails.fillInCardDetails(validCard);
    await paymentDetails.clickPayButton();
    await paymentDetails.assertPaymentSuccessful();

    await paymentDetails.assertOrderTotalPriceMatchesContents(
      testProducts.testTshirtItem.price,
      deliveryMethods.upsGround.price
    );
  });
});
