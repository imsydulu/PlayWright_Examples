import { expect, Locator, test } from '@playwright/test'

test.skip("Wokring with pagination : ", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    //table#example
    let hasMorePages = true;
    const table: Locator = page.locator("table#example");
    const table_rows: Locator[] = await table.locator("tbody tr").all();

    for (const table_row of table_rows) {
        console.log(await table_row.innerText());
    }
    //[aria-label='Next']
    //:has-text('›')
    while (hasMorePages) {
        const nextLocator: Locator = page.locator("[aria-label='Next']");
        const next_enabled: boolean = await nextLocator.isEnabled();
        if (next_enabled) {
            hasMorePages = true;
            await nextLocator.click();
            await page.waitForTimeout(2000);

        } else {
            hasMorePages = false;
        }
    }
    await page.waitForTimeout(3000);
});
test.skip("Verify the filter rows and dosplayed rows are equal: ", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    //select.dt-input
    await page.locator("select.dt-input").selectOption({ value: '25' });
    await page.waitForTimeout(3000);
    const table: Locator = page.locator("table#example");
    const totolrows: Locator = table.locator("tbody tr");
    const rowsarr: Locator[] = await totolrows.all();
    //expect(rowsarr.length).toBe(25);
    // expect(rowsarr).toHaveLength(25);
    expect(totolrows).toHaveCount(25);

});

test("verify that search an element in all pages:  ", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const searchbox: Locator = page.locator("input.dt-input");
    await searchbox.fill("Jonas Alexande");
    await page.waitForTimeout(3000);
    const tablerows: Locator[] = await page.locator("#example tbody tr").all();
    if (tablerows.length > 0) {
        for (const eachrow of tablerows) {
            if ((await eachrow.innerText()).includes(await searchbox.inputValue())) {
                console.log("input value search found!!!!!",await searchbox.inputValue());
                break;
            }
        }

    } else {
        console.log("Now rows found to search input text");
    }
    await page.waitForTimeout(3000);
});