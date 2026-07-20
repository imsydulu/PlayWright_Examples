import { expect, test } from '@playwright/test'
//# both the tags
//npx playwright test tags_ex.spec.ts --project=chromium --headed --grep "(?=.*@sanity)(?=.*@regression)"
//npx playwright test tags_ex.spec.ts --project=chromium --headed --grep "@sanity|@regression"
//npx playwright test tags_ex.spec.ts --project chromium --headed --grep "@sanity" --grep-invert '@regression'
//npx playwright test tags_ex.spec.ts --project chromium --headed --grep "@sanity"
//npx playwright test tags_ex.spec.ts --project chromium --headed --grep "@regression"

//# Tests having neither @sanity nor @regression
//npx playwright test tags_ex.spec.ts --project=chromium --headed --grep-invert "@sanity|@regression"

//# All tests with both tags, in either order
//npx playwright test tags_ex.spec.ts --project=chromium --headed --grep "(?=.*@sanity)(?=.*@regression)"

//# Run on all configured browsers
//npx playwright test tags_ex.spec.ts --headed --grep "@sanity"

test('sanity: check the title of the homepage: ', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
    expect(page).toHaveTitle('Google');
    console.log("sanity tag is executed!!!");

})
test('sanity, regression => check the title Google: ', { tag: ['@sanity', '@regression'] }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
    expect(page).toHaveTitle('Google');
    console.log("sanity and regression tags are executed!!!");
})

test('regression: check the title of the homepage: ', { tag: '@regression' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
    expect(page).toHaveTitle('Google');
    console.log('regreession tag is executed!!!!');

})