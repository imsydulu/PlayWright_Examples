import { expect, Page, test } from '@playwright/test';

import fs from 'fs';

const filepath: string = 'testdata/logindata.json';

const readfile: string = fs.readFileSync(filepath, 'utf-8');

const loginTestData: any = JSON.parse(readfile);

const baseurl = 'https://demowebshop.tricentis.com/';
async function login(page: Page, user: string, pass: string) {
    await page.goto(baseurl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user);
    await page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await page.getByRole('button', { name: 'Log in' }).click();
}

for (const { email, password, expectedResult } of loginTestData) {
    test.describe('Data Driven Login Data', () => {
        test(`Login test for ${email} and ${password}`, async ({ page }) => {
            await login(page, email, password);
            if (expectedResult.toLowerCase() === 'valid') {
                //await login(page, email, password);
                console.log('page is opened');
                await expect(page.getByRole('link', { name: 'Log out', })).toBeVisible({ timeout: 5000 });

            } else {
                //await login(page, email, password);
                //.validation-summary-errors span
                await expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 5000 });
            }
        })
    })
}






