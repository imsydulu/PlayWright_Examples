import { expect, Page, test } from '@playwright/test'

const loginTestData: string[][] = [['laura.taylor1234@example.com', 'test123', 'valid'],
['invaliduser@gmail.com', 'test123', 'invalid'],
['validnotuser@gmail.com', 'testxyz', 'invalid'],
[' ', ' ', 'invalid']];

// test('test', () => {
//     for (const [email, passs, validity] of loginTestData) {
//         console.log(email, passs, validity);
//     }
// })
//Reusable funcion for login
const baseurl = 'https://demowebshop.tricentis.com/';
async function login(page: Page, user: string, pass: string) {
    await page.goto(baseurl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user);
    await page.getByRole('textbox', { name: 'Password' }).fill(pass);
    await page.getByRole('button', { name: 'Log in' }).click();
}

for (const [email, password, validity] of loginTestData) {
    test.describe('Data Driven Login Data', () => {
        test(`Login test for ${email} and ${password}`, async ({ page }) => {
            await login(page, email, password);
            if (validity.toLowerCase() === 'valid') {
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

