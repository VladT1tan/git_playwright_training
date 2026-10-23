import { test, expect } from '@playwright/test';


test('Check that the correct product is displayed when selecting Combination Pliers', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await page.getByText('Combination Pliers').click();
	await expect(page.getByTestId('product-name')).toContainText('Combination Pliers');
});


test('Check that the correct product is displayed when selecting Claw Hammer', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await page.getByText('Claw Hammer', {exact: true}).click();
	await expect(page.locator('[data-test="product-name"]')).toContainText('Claw Hammer');
});


test('Check that the correct product is displayed when selecting Thor Hammer', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await page.getByRole('checkbox', {name: 'Hammer'}).check();
	await page.getByPlaceholder('Search').fill('Thor Hammer');
	await page.getByRole('button', {name: 'Search'}).click();
	await page.locator('//a[@class="card"]').getByRole('heading', {name: 'Thor Hammer'}).click();
	await expect(page.locator('[data-test="product-name"]')).toContainText('Thor Hammer');
});


test('Check that the correct product is displayed when selecting an out-of=stock item', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await page.locator('//a[@class="card"]').filter({hasText: "Out of stock"}).first().click();
	await expect(page.locator('[data-test="out-of-stock"]')).toContainText('Out of stock');
});


test('Check that the correct error message is displayed when entering incorrect credentials', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await page.locator('[data-test="sort"]').selectOption('price,desc');
	await page.locator('[data-test="category-01M504NZ3BH873J7X1FPQC0NTE"]').check();
	await page.locator('[data-test="product-01M504NZ4KZN19V3KMPHJFNB92"]').click();
	await page.locator('[data-test="increase-quantity"]').dblclick();
	await page.locator('[data-test="add-to-cart"]').hover();
	await page.locator('[data-test="add-to-cart"]').click();
	await page.locator('[data-test="nav-cart"]').click();
	await page.locator('[data-test="proceed-1"]').click();
	await page.locator('[data-test="email"]').click();
	await page.locator('[data-test="email"]').press('CapsLock');
	await page.locator('[data-test="email"]').fill('V');
	await page.locator('[data-test="email"]').press('CapsLock');
	await page.locator('[data-test="email"]').fill('Vladislav.');
	await page.locator('[data-test="email"]').press('CapsLock');
	await page.locator('[data-test="email"]').fill('Vladislav.A');
	await page.locator('[data-test="email"]').press('CapsLock');
	await page.locator('[data-test="email"]').fill('Vladislav.Ababii@gmail.com');
	await page.locator('[data-test="email"]').press('Tab');
	await page.locator('[data-test="password"]').fill('12291522a');
	await page.locator('[data-test="login-submit"]').click();
	await expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
});


test('test', async ({ page }) => {
	await page.goto('https://practicesoftwaretesting.com/');
	await expect(page.locator('#filters').getByText('Hammer')).toBeVisible();
	await expect(page.locator('div').filter({ hasText: 'Hand Saw' }).nth(4)).toBeVisible();
	await expect(page.getByText('Wrench')).toBeVisible();
	await expect(page.getByText('Screwdriver')).toBeVisible();
});