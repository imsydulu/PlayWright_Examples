import { expect, test } from '@playwright/test'

test('reporter test: ', async () => {
    console.log("test is executed: ");
})

test.skip('google test reporter:', async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Google');
})

test.fail('reporter test ', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Demo Web Shop');
})