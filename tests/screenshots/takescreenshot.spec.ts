import { expect, Locator, test } from '@playwright/test'

test.skip("verify that capturing screenshot: ", async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
    const timestamp = Date.now();
    //await page.screenshot({ path: 'screenshots/mainpage.png' });
    //filename with timestamp
    //await page.screenshot({ path: `screenshots/mainpage${timestamp}.png` });
    //fullpage from the webpage
    //await page.screenshot({ path: `screenshots/fullpage${timestamp}.png`, fullPage: true });

    const logo: Locator = page.getByAltText('Tricentis Demo Web Shop');
    logo.screenshot({ path: `screenshots/logo${timestamp}.png` });

    await page.locator('.product-grid.home-page-product-grid').screenshot({ path: `screenshots/featuredProds${timestamp}.png` });
})
test("verify that a test is passed:", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'domcontentloaded' });
    console.log("test passsed");
})

test("verify the screenshot automaticalyy taken and stored:", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'domcontentloaded' });
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Welcome pavanol' })).toBeVisible();
})