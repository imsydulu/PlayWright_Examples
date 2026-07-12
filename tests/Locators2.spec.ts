import { test, expect, Locator } from '@playwright/test'

test("verify the GetByText locator", async ({ page }) => {
    await page.goto("https://www.playwright.dev/");
    await expect(page.getByRole("heading", { name: "Playwright Test" })).toBeVisible();
    const text: Locator = page.getByText(" enables reliable web automation for testing, scripting, and AI agents.");
    await expect(text).toBeVisible();
    const roleLocator: Locator = page.getByRole("link", { name: "Get started" });
    await roleLocator.click();
    
    
})