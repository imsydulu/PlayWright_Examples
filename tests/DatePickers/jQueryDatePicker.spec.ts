import { expect, Locator, Page, test } from '@playwright/test'



test("Verify that working with  jQuery_datepicker: ", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datepicker: Locator = page.locator("input#datepicker");
    //aproach 1
    await expect(datepicker).toBeVisible();
    await expect(datepicker).toBeEnabled();
    await datepicker.click();
    //await datepicker.fill("12/06/2025")//mm/dd/yyyy
    await page.waitForTimeout(3000);
    //aproach 2
    const req_year = '2027';
    const req_month = 'May';
    const req_day = '25';
    while (true) {
        const search_month: Locator = page.locator(".ui-datepicker-month");//.ui-datepicker-month
        const search_year: Locator = page.locator(".ui-datepicker-year");//.ui-datepicker-year
        if (req_year === await search_year.innerText() && req_month === await search_month.innerText()) {
            break;
        }
        //await page.locator(".ui-datepicker-next").click(); //for future year

        await page.locator(".ui-datepicker-prev").click(); // for past year 
    }

    const alldays: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    //future date operations:
    for (const day of alldays) {
        if (req_day === await day.innerText()) {
            await day.click();
            break;
        }
    }

    await page.waitForTimeout(3000);
});