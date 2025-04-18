import { authUser as test } from "./fixtures/auth";
import { testProducts } from "./utils/testProducts";
import { ProductsPage } from "./pages/products";
import { ProductDetailsPage } from "./pages/ProductDetails";
import { CartPage } from "./pages/Cart";

test.describe("Abandoned cart scenarios", () => {
  test("cart items persist after closing browser tab", async ({
    authenticatedPage,
  }) => {
    const productsPage = new ProductsPage(authenticatedPage);
    const productDetailsPage = new ProductDetailsPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);

    await productsPage.goToProductsPage();
    await productsPage.selectItem(testProducts.testShirtItem.name);
    await productDetailsPage.selectProductSize(testProducts.testShirtItem.size);
    await productDetailsPage.clickAddToCartButton();
    await cartPage.closeCartSidebar();

    const context = authenticatedPage.context();
    authenticatedPage.close();

    const newPage = await context.newPage();
    const revisitedCartPage = new CartPage(newPage);

    await revisitedCartPage.navigatetoCartPage();
    await revisitedCartPage.assertItemInCart(testProducts.testShirtItem.name);
  });
});
