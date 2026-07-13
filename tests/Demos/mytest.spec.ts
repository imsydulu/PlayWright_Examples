import { test, expect, chromium } from '@playwright/test'

test("title:", () => {

})

/*test("verify the title of page", async () => {
    const browser = await chromium.launch();
    //const context=await browser.newContext();
    const page = await (await browser.newContext()).newPage();

    await page.goto("https://www.google.com/");
    await page.waitForTimeout(3000);


})*/


test("verify page title", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");
})