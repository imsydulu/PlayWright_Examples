import { Locator, test } from '@playwright/test'

test("amazon task:", async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    page.locator("input#twotabsearchtextbox").fill("iphone");
    await page.locator("[value='Go']").click();
    await page.waitForTimeout(3000);
    await page.locator("#a-autoid-1-announce").click();


});