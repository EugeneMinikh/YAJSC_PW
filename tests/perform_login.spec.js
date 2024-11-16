import { expect, test } from "@playwright/test";
import { constants } from "../constants";
import { beforeEach } from "node:test";
require("dotenv").config({
  path: "/Users/eugene_minikh/Work_project/Yajsc_PW/YAJSC_PW/.env",
});

console.log(constants.baseUrl);

test.beforeEach(async ({ page }) => {
  await page.goto(constants.baseUrl);
  await page.fill("#user-name", constants.validUsername);
  await page.fill("#password", constants.validPassword);
  await page.click("#login-button");
});

test("perform login", async ({ page }) => {
  const productsButton = page.getByText("Products");
  const shopCard = page.locator("#shopping_cart_container");
  const listLocator = page.locator(".inventory_list");
  const itemCount = await listLocator.count();

  await expect(productsButton).toBeVisible();
  await expect(shopCard).toBeVisible();

  expect(itemCount).toBeGreaterThan(0);
});

test("Add product to the cart", async ({ page }) => {
  const productSelection = page.locator('//*[@id="item_4_title_link"]');
  const addToCartButton = page.locator(
    '//*[@id="add-to-cart-sauce-labs-backpack"]'
  );

  await addToCartButton.click();

  const cartCount = await page.locator(".shopping_cart_badge").innerText();
  expect(cartCount).toBe("1");

  await page.click(".shopping_cart_link");

  const productNameInCart = await page
    .locator("#item_4_title_link")
    .innerText();
  const productName = await productSelection.innerText();
  expect(productNameInCart).toBe(productName);
});
