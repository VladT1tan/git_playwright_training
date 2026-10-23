import { test, expect } from '@playwright/test';
import loginData from '../test-data/login.json';

test('login with credentials from JSON', async ({ page }) => {
	await page.goto('https://www.saucedemo.com/');

	await page.getByPlaceholder('Username').fill(loginData.username);
	await page.getByPlaceholder('Password').fill(loginData.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page).toHaveURL(/inventory\.html/);
});