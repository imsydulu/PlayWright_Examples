import { test, Page, Locator, expect } from '@playwright/test'

async function selectDate(req_year: string, req_month: string, req_day: string, page: Page, isFuture: boolean) {

    while (true) {

        let current_month = (await page.locator(".ui-datepicker-month").innerText()).trim();//.ui-datepicker-month
        let current_year = (await page.locator(".ui-datepicker-year").innerText()).trim(); //.ui-datepicker-year
        if (req_year === current_year && req_month === current_month) {
            break;
        }
        if (isFuture) {
            await page.locator(".ui-datepicker-next").click(); //for future year
        } else {
            await page.locator(".ui-datepicker-prev").click(); // for past year 
        }
    }//closing while()
    await page.waitForTimeout(1000);
    const alldays: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    //click date:
    for (const day of alldays) {
        if (req_day === await day.innerText()) {
            await day.click();
            break;
        }
    }


}//closing function

test("test datepicker:", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datepicker: Locator = page.locator("input#datepicker");
    await expect(datepicker).toBeVisible();
    await expect(datepicker).toBeEnabled();
    await datepicker.click();
    await page.waitForTimeout(2000);
    const current_year: string = await page.locator(".ui-datepicker-year").innerText();
    const req_year = '2027';
    const req_month = 'June';
    const req_day = '25';
    let value = req_year > current_year;
    console.log("Value for isBig  :::", value);
    await selectDate(req_year, req_month, req_day, page, value);
});