import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByLabel('Email address');
		this.passwordInput = page.locator('[data-test="password"]');
		this.loginButton = page.getByRole('button', { name: 'Login' });
	}

	async goto(): Promise<void> {
		await this.page.goto('https://practicesoftwaretesting.com/auth/login');
	}

	async login(email: string, password: string): Promise<void> {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}
}
