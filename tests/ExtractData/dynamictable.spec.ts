import { Locator, test } from '@playwright/test'

test("Handling dynamic elements: ", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator(".table-striped tbody");
    const table_rows: Locator[] = await table.locator("tr").all();
    let cpuload = '';
    //get the dynamic cpu load for chrome from the table
    for (const tablerow of table_rows) {
        const br_name: string = await tablerow.locator("td").nth(0).innerText();
        if (br_name === 'Chrome') {
            cpuload = await tablerow.locator("td:has-text('%')").innerText();
            //await tablerow.locator("td", { hasText: '%' }).innerText();
            console.log("CPU LOAD of chrome:  ", cpuload);
            break;

        }
    }






});