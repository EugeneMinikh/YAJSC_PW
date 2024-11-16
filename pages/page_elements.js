class PageElements {
  constructor(page) {
    this.page = page;
  }

  async getProductsButton() {
    return this.page.getByText("Products");
  }

  getShopCard() {
    return this.page.locator("#shopping_cart_container");
  }

  getListLocator() {
    return this.page.locator(".inventory_list");
  }

  async getItemCount() {
    const listLocator = await this.getListLocator();
    return listLocator.count();
  }

  getProductSelection() {
    return this.page.locator('//*[@id="item_4_title_link"]');
  }

  getAddToCartButton() {
    return this.page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]');
  }

  async getProductNameInCart() {
    const productSelection = await this.getProductSelection();
    return productSelection.innerText();
  }

  getCartCount() {
    return this.page.locator(".shopping_cart_container");
  }

  async getProductName() {
    const productSelection = await this.getProductSelection();
    return productSelection.innerText();
  }

  getRemoveButton() {
    return this.page.getByText("Remove");
  }
}

module.exports = PageElements;
