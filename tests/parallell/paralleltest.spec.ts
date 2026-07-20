import { expect, test } from '@playwright/test'
//test.describe.parallel
test.describe.serial("parallel testing", () => {


    test('test one:', async ({ page }) => {
        // await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
        // await expect(page).toHaveTitle('Google');
        console.log('Test 1 is executed!!!!');

    })
    test('test two:', async ({ page }) => {
        // await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
        // await expect(page).toHaveTitle('Google');
        console.log('Test 2 is executed!!!!');

    })
    test('test three:', async ({ page }) => {
        // await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
        // await expect(page).toHaveTitle('Google');
        console.log('Test 3 is executed!!!!');

    })
    test('test four:', async ({ page }) => {
        // await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
        // await expect(page).toHaveTitle('Google');
        console.log('Test 4 is executed!!!!');

    })
    test('test five:', async ({ page }) => {
        await page.goto('https://google.com/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle('Google');
        console.log('Test 5 is executed!!!!');

    })

})