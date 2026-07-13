import { test, expect, Locator } from '@playwright/test'

test("verify the GetAltByText locator", async ({ page }) => {

    await page.goto("https://playwright.dev/");
    const logo: Locator = page.getByAltText("Chromium, Firefox, WebKit");
    await expect(logo).toBeVisible();
})

