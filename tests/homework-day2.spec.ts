import { test, expect } from '@playwright/test';

// TASK 1 — Search for pliers
test('Search for Pliers and verify the returned products', async ({ page }) => {

	await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('textbox', { name: 'Search' }).dblclick();
  await page.getByRole('textbox', { name: 'Search' }).fill('Pliers');
  await expect(page.getByRole('textbox', { name: 'Search' })).toHaveValue('Pliers');
  await page.getByRole('button', { name: 'Search' }).click();
  
	const products = page.locator('[data-test="product-name"]');

  await expect(products).toHaveCount(4);
});


// TASK 2 — Filter the catalog to hammers
test('Filter products by Hammer category and verify the checkbox state', async ({ page }) => {

	await page.goto('https://practicesoftwaretesting.com/');
  await page.getByLabel('Hammer').check();
  await expect(page.getByLabel('Hammer')).toBeChecked();

  const products = page.locator('[data-test="product-name"]');

  await expect(products).toHaveCount(7);
  await page.getByLabel('Hammer').uncheck();
  await expect(page.getByLabel('Hammer')).not.toBeChecked();
});


// TASK 3 — Sort products by name
test('Sort products by name A-Z and verify the first product', async ({ page }) => {

	await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption({ label: 'Name (A - Z)' });
  await expect(page.locator('.card-title')).toHaveCount(9);
  await expect(page.locator('.card-title').first()).toContainText('Adjustable Wrench');
  await expect(page.locator('.card-title').first()).toHaveClass(
		/card-title/,
	);
});


// TASK 4 — Inspect a product and add two items to the cart
test('Inspect Combination Pliers and add two items to the cart', async ({ page }) => {

	await page.goto('https://practicesoftwaretesting.com/');

  const combinationPliers = page
    .locator('[data-test="product-name"]')
    .filter({ hasText: 'Combination Pliers' });

  await expect(combinationPliers).toHaveCount(1);

  await combinationPliers.hover();
  await combinationPliers.click();

  await expect(
    page.getByRole('heading', { name: 'Combination Pliers', level: 1 })
  ).toBeVisible();

  await expect(page.getByRole('spinbutton')).toHaveValue('1');
  await page.getByRole('button', { name: /increase quantity/i }).click();
  await expect(page.getByRole('spinbutton')).toHaveValue('2');
  await page.getByRole('button', { name: /add to cart/i }).click();

  await expect(
    page.getByRole('alert')
  ).toContainText('Product added to shopping cart');

  const cartLink = page.getByRole('link', { name: /cart/i });

  await expect(cartLink).toBeVisible();
  await expect(cartLink).toContainText('2');
});
