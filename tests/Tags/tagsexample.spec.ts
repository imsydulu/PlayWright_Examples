import { expect, Page, test } from '@playwright/test';

/**
 * Real-world tag example: Sauce Demo e-commerce coverage.
 *
 * Useful commands:
 * npx playwright test tests/Tags/tagsexample.spec.ts --project=chromium --grep "@sanity"
 * npx playwright test tests/Tags/tagsexample.spec.ts --project=chromium --grep "@regression"
 * npx playwright test tests/Tags/tagsexample.spec.ts --project=chromium --grep "@sanity|@regression"
 * npx playwright test tests/Tags/tagsexample.spec.ts --project=chromium --grep "(?=.*@sanity)(?=.*@regression)"
 */

async function login(page: Page) {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
}

test('customer can log in', { tag: ['@sanity', '@smoke'] }, async ({ page }) => {
    await login(page);
    await expect(page.locator('.inventory_list')).toBeVisible();
});

test('customer can view the product catalogue', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await login(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('customer can add a product to the cart', { tag: '@regression' }, async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('customer can complete checkout details', { tag: ['@regression', '@checkout'] }, async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('First Name').fill('Alex');
    await page.getByPlaceholder('Last Name').fill('Taylor');
    await page.getByPlaceholder('Zip/Postal Code').fill('560001');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('.summary_info')).toBeVisible();
});
