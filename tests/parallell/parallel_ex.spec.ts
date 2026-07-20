import { expect, Page, test } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com/';

async function login(page: Page) {
  await page.goto(baseUrl);
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory.html/);
}

/**
 * These tests are independent: each receives its own browser context and data.
 * They can safely run at the same time when workers > 1.
 *
 * Run: npx playwright test tests/parallell/parallel_ex.spec.ts --project=chromium --workers=3
 */
test.describe.parallel('Parallel: independent storefront checks', () => {
  test('valid customer can sign in', { tag: '@parallel' }, async ({ page }) => {
    await login(page);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('invalid credentials show an error', { tag: '@parallel' }, async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(/Sorry, this user has been locked out/i)).toBeVisible();
  });

  test('product catalogue contains six products', { tag: '@parallel' }, async ({ page }) => {
    await login(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});

/**
 * Serial is appropriate when tests use a shared staging account or shared data.
 * This checkout smoke workflow is deliberately kept in a defined order.
 * If one serial test fails, Playwright skips the remaining tests in this block.
 */
test.describe.serial('Serial: ordered checkout checks', () => {
  test('1. customer can add one item to the cart', { tag: '@serial' }, async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('2. customer can open checkout', { tag: '@serial' }, async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('link', { name: /shopping cart/i }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  });
});
