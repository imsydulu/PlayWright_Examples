import { expect, Locator, test } from '@playwright/test'

test("extract from static webpage", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table: Locator = page.locator("[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //count no of rows in a table
    const rowslocator: Locator = table.locator("tr");
    await expect(rowslocator).toHaveCount(7);

    const rows: number = await rowslocator.count();
    console.log(rows);
    expect(rows).toBe(7);
    //count the no of columns
    page.mouse.wheel(0, 750);
    const thlocator: Locator = rowslocator.locator("th");
    expect(thlocator).toHaveCount(4);
    expect(await thlocator.count()).toBe(4);

    console.log("Second row header from the table:   ", await thlocator.nth(2).innerText());
    console.log("Second row Element from the table: ", await rowslocator.nth(3).locator("td").allInnerTexts());
    //extracting all the data from a table

    const allrows: Locator[] = await rowslocator.all();

    console.log("All rows==============");
    for (const rowlocator of allrows.slice(1)) {
        //console.log(await rowlocator.innerText());
        console.log((await rowlocator.locator("td").allInnerTexts()).join("\t"));
    }
    // const authortext: string = await rowlocator.locator("td").innerText();
    for (let i = 1; i < allrows.length; i++) {
        //const tabletxt: string[] = await allrows[i].locator("td").allInnerTexts();
        const singlerow: string[] = await allrows[i].locator("td").allInnerTexts();
        for (const singleelement of singlerow) {
            if (singleelement === 'Mukesh') {
                console.log(singlerow[0]);
            }
        }
    }
});