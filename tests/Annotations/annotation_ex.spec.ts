import { expect, test } from '@playwright/test';

/**
 * A practical annotation example using the Sauce Demo storefront.
 *
 * Run only this file:
 *   npx playwright test tests/Annotations/annotation_ex.spec.ts
 *
 * Open the HTML report afterwards to see the custom annotations:
 *   npx playwright show-report
 */
test.describe('Sauce Demo - annotated checkout coverage', () => {
  test(
    'standard user can add an item to the cart',
    {
      tag: ['@smoke', '@checkout'],
      annotation: [
        {
          type: 'requirement',
          description: 'JIRA-123: A signed-in shopper can add a product to the cart.',
        },
        {
          type: 'owner',
          description: 'QA team',
        },
      ],
    },
    async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();

      await page.getByRole('button', { name: 'Add to cart' }).first().click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    },
  );

  test('payment-provider scenario is not available in the test environment', async () => {
    test.skip(true, 'The sandbox payment provider is unavailable until test data is provisioned.');
    // Test steps will be added when the payment sandbox is ready.
  });

  test('known Firefox inventory rendering issue', async ({ browserName }) => {
    test.fixme(browserName === 'firefox', 'Known issue: UI-456 is still open for Firefox.');
    expect(browserName).not.toBe('firefox');
  });

  test('inventory page needs extra time on Firefox', async ({ browserName, page }) => {
    test.slow(browserName === 'firefox', 'Firefox takes longer to load inventory in CI.');
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('known defect is expected to fail until it is fixed', async () => {
    test.fail(true, 'Known defect: UI-789');
    // This represents the failing assertion that will be removed after UI-789 is fixed.
    expect('checkout total').toBe('checkout subtotal');
  });
});
