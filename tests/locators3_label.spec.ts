import { test, expect } from '@playwright/test'

test("verify the GetByLabel Locator", async ({page}) => {
    await page.goto("https://www.facebook.com/");
    await page.getByLabel("Email address or mobile number").fill("username");
    await page.getByLabel("Password").fill("password");

})