import { expect, test } from '@playwright/test'
//only
//skip , wiht condition
//fail
//fixme
//slow

test('test without annotations', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('img.lnXdpd')).toBeVisible();
})

/*test.only('test with annotation : only ', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('img.lnXdpd')).toBeVisible();
})*/

test.skip('test with annotation : skip ', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('img.lnXdpd')).toBeVisible();
})

test.fixme('test with annotation : fixme ', { tag: '@sanity' }, async ({ page }) => {
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('img.lnXdpd')).toBeVisible();
})

test("using annotations : slow ", async ({ page, browserName }) => {
    test.slow(browserName === 'firefox', 'browsername is firefox: ')
    await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('img.lnXdpd')).toBeVisible();
})

