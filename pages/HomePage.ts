import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;
  readonly sortDropdown: Locator;
  readonly productLinks: Locator;
  readonly visiblePrices: Locator
	readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="nav-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productLinks = page.locator('[data-test="product-name"]');
    this.visiblePrices = page.locator('[data-test="product-price"]');
		this.removeButtons = page.locator('a.btn.btn-danger');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async addItemToCart(productName: string): Promise<void> {
    // Open the home page and select the product.
    await this.goto();

    await this.productLinks.filter({
      hasText: productName,
    }).click();

    // Add the selected product to the cart.
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async removeItemFromCart(): Promise<void> {
    // Open the cart and remove the first item.
    await this.cartLink.click();

    await this.removeButtons.first().click();
  }
}