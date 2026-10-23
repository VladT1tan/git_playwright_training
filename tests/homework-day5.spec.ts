import { readFileSync } from 'node:fs';
import { test, expect } from '../fixtures';

// TASK 1 — Logged-in fixture
test('Logged-in fixture opens the account page', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/\/account/);
});

// TASK 2 — Playwright hooks
test.describe('catalog hooks', () => {
  let suiteStartTime: number;

  test.beforeAll(() => {
    suiteStartTime = Date.now();
    console.log('Catalog test suite started:', new Date(suiteStartTime).toISOString());
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();

      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log('Catalog test suite finished.');
  });

  test('Catalog home page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
    await expect(
      page.getByRole('link', { name: 'Home' })
    ).toBeVisible();
  });
});

// TASK 3 — Data-driven login tests
type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: 'success' | 'failure';
};

const csvContent = readFileSync(
  'test-data/login-cases.csv',
  'utf-8'
);

const lines = csvContent.trim().split(/\r?\n/);


const loginCases: LoginCase[] = lines.slice(1).map((line) => {
  const [name, email, password, expectedResult] = line.split(',');

  if (!name || !email || !password) {
    throw new Error(`Missing required field in CSV row: ${line}`);
  }

  if (expectedResult !== 'success' && expectedResult !== 'failure') {
    throw new Error(`Invalid expectedResult in CSV row: ${line}`);
  }

  return {
    name,
    email,
    password,
    expectedResult,
  };
});

for (const loginCase of loginCases) {
  test(`Login: ${loginCase.name}`, async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByLabel('Email address').fill(loginCase.email);
    await page.locator('[data-test="password"]').fill(loginCase.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (loginCase.expectedResult === 'success') {
      await expect(page).toHaveURL(/\/account/);
    } else {
      await expect(
        page.getByText('Invalid email or password', { exact: false })
      ).toBeVisible();
    }
  });
}