import { expect, test } from "@playwright/test";
import { constants } from "../constants";
import PageElements from "../pages/page_elements";

require("dotenv").config({
  path: "/Users/eugene_minikh/Work_project/Yajsc_PW/YAJSC_PW/.env",
});

test.beforeEach(async ({ page }) => {
  await page.goto(constants.baseUrl);
  await page.fill("#user-name", constants.validUsername);
  await page.fill("#password", constants.validPassword);
  await page.click("#login-button");
});

test("perform login", async ({ page }) => {
  const elements = new PageElements(page);
  const productsButton = await elements.getProductsButton();
  const shopCard = await elements.getShopCard();
  const listLocator = await elements.getListLocator();
  const itemCount = await listLocator.count();

  await expect(productsButton).toBeVisible();
  await expect(shopCard).toBeVisible();
  expect(itemCount).toBeGreaterThan(0);
});

test("Add product to the cart", async ({ page }) => {
  const elements = new PageElements(page);
  const productSelection = await elements.getProductSelection();
  const addToCartButton = await elements.getAddToCartButton();
  const productNameInCart = await elements.getProductNameInCart();
  const cartCountLocator = await elements.getCartCount();
  const productName = await elements.getProductName();
  const removeButton = await elements.getRemoveButton();

  await addToCartButton.click();

  const cartCount = await cartCountLocator.innerText();
  expect(cartCount).toContain("1");

  await page.click(".shopping_cart_link");
  expect(productNameInCart).toBe(productName);

  await removeButton.click();

  const updatedCartCount = await cartCountLocator.innerText();
  expect(updatedCartCount).toBe("");
});
