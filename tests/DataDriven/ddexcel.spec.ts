import { expect, Page, test } from '@playwright/test'
import { log } from 'console';
import fs from 'fs';
import xlsx, { WorkSheet } from 'xlsx';

const filepath = 'testdata/logindata.csv';
const workbook = xlsx.readFile(filepath);
const sheetnames: string = workbook.SheetNames[0];
const worksheet: WorkSheet = workbook.Sheets[sheetnames];
const loginTestData: any = xlsx.utils.sheet_to_json(worksheet);
console.log(loginTestData);



const baseurl = 'https://demowebshop.tricentis.com/';
async function login(page: Page, user: string, pass: string) {
    await page.goto(baseurl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user);
    await page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await page.getByRole('button', { name: 'Log in' }).click();
}
test.describe('Data Driven Login Data', () => {
    for (const { email, password, expectedResult } of loginTestData) {
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

    }
})





