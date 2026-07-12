import { expect, Locator, test } from '@playwright/test'

test("verify that finding the elements with csslocator", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const search: Locator = page.locator("input#small-searchterms");
    await expect(search).toBeVisible();
    await search.fill("laptop");
    //tag classs
    const registerLink: Locator = page.locator("a.ico-register");
    await expect(registerLink).toBeVisible();
    //attribute //input[type='submit'] or [type='submit']
    const searchButton: Locator = page.locator("input[type='submit']");
    await expect(searchButton).toBeVisible();
    await search.fill("laptop");
    await page.waitForTimeout(2000);
    await searchButton.click();
    //npx playwright test csslocator.spec.ts --project chromium --project firefox --headed

})

test("verify that finding the elements with absolute css locator", async ({ page }) => {
    //html>body>div>div>div>main>div>div>p[id='para1']
    await page.goto("https://testpages.eviltester.com/pages/basics/basic-web-page/");
    const para1: Locator = page.locator("html>body>div>div>div>main>div>div.pageinfo>p");
    await expect(para1).toBeVisible();
    //await expect(para1).toHaveText("Very simple web pages have a structure illustrated");
    await expect(para1).toContainText("Very simple web pages have a structure illustrated");
})

test("verify that finding the elements with relative css locator", async ({ page }) => {
    await page.goto("https://testpages.eviltester.com/pages/basics/basic-web-page/");
    const para1: Locator = page.locator(".pageinfo p");
    await expect(para1).toBeVisible();
    await expect(para1).toContainText("Very simple web pages have a structure illustrated");
    await page.setViewportSize({ width: 1920, height: 1080 });
})