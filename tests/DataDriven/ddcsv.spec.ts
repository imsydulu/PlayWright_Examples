import { expect, Page, test } from '@playwright/test'
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const filepath = 'testdata/logindata.csv';
const csvcontent = fs.readFileSync(filepath, 'utf-8');
const loginTestData = parse(csvcontent, { columns: true, skip_empty_lines: true }) as any;

const baseurl = 'https://demowebshop.tricentis.com/';
async function login(page: Page, user: string, pass: string) {
    await page.goto(baseurl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user);
    await page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await page.getByRole('button', { name: 'Log in' }).click();
}
test.describe('Data Driven Login Data', () => {
    for (const data of loginTestData) {
        test(`Login test for ${data.email} and ${data.password}`, async ({ page }) => {
            await login(page, data.email, data.password);
            if (data.expectedResult.toLowerCase() === 'valid') {
                //await login(page, email, password);
                console.log('page is opened');
                await expect(page.getByRole('link', { name: 'Log out', })).toBeVisible({ timeout: 5000 });

            } else {
                //await login(page, email, password);
                //.validation-summary-errors span
                await expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 5000 });
            }
        })

    }
})





