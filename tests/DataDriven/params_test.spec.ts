import { expect, test } from '@playwright/test'
const searchArr: string[] = ['computer', 'book', 'laptop', 'monitor'];

for (const item of searchArr) {
    test.describe(`search for a ${item}`, () => {
        test(`search for ${item}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
            await page.locator('input#small-searchterms').fill(item);
            await page.getByRole('button', { name: 'Search' }).click();
            // expect(await page.locator('.search-results a').count).toBeGreaterThan(2);
            await page.waitForTimeout(3000);
            console.log("count :  ", await page.locator('.picture').count());
            expect(await page.locator('.picture').count()).toBeGreaterThan(0);
            console.log(`searched for ${item}`);

        })
    })
}
