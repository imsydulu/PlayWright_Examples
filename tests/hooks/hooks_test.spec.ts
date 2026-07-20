import { expect, Page, test } from '@playwright/test'
let page: Page
test.beforeAll('Webpage is launching', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'domcontentloaded' })
})

test.afterAll('close the browser', async () => {
    await page.close();
    console.log("Closed the Browser");
})

test.beforeEach('login before every task ', async () => {
    await page.locator('#login2').click();
    await page.waitForTimeout(2000);
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { 'name': 'Log in' }).click();
})

test.describe('Group for the tests', async () => {
    test('get the phones list', async () => {
        await page.locator("//a[text()='Phones']").click();
        expect(page.locator('#tbodyid div')).toHaveCount(21);

    })

    test('verify that user is successfully logged in:', async () => {
        await expect(page.locator('#nameofuser')).toBeVisible();
    })
})

test.afterEach('logout after each task:', async () => {
    //await page.getByRole('button', { 'name': 'Log out' }).click();
    await page.locator('#logout2').click();
})