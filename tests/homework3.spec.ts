import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// TEST 1 — Add two products
test('Add Combination Pliers and Bolt Cutters to the cart', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.addItemToCart('Combination Pliers');

  await expect(homePage.cartQuantity).toHaveText('1');

  await homePage.goto();

  await homePage.addItemToCart('Bolt Cutters');

  // Verify that the cart contains two items.
  await expect(homePage.cartQuantity).toHaveText('2');
});

// TEST 2 — Add two products and remove one
test('Add Combination Pliers and Pliers, then remove one item', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.addItemToCart('Combination Pliers');

  await expect(homePage.cartQuantity).toHaveText('1');

  await homePage.goto();

  await homePage.addItemToCart('Bolt Cutters');

  // Verify that the cart contains two items.
  await expect(homePage.cartQuantity).toHaveText('2');

  await homePage.removeItemFromCart();

  // Verify that one item remains in the cart.
  await expect(homePage.cartQuantity).toHaveText('1');
});