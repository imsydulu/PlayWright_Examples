import { expect, Locator, test } from '@playwright/test'

test.skip('verify dropdwon is sorted', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const alloptionsttexts: string[] = (await (page.locator('#animals option').allInnerTexts())).map(text => text.trim());
    const originalArr: string[] = [...alloptionsttexts];
    const sortedlist: string[] = [...originalArr.sort()];

    console.log(originalArr);
    console.log(sortedlist);


});
test("working with dropdwon tasks:", async ({ page }) => {
    await page.goto("https://bstackdemo.com/");
    const mobilelist: string[] = (await (page.locator(".shelf-container div.shelf-item").allTextContents())).map(text => text.trim());
    const mobilearr: string[] = mobilelist;
    expect(mobilearr.length).toBe(25);
    //console.log(mobilearr);
    await page.locator(".sort select").selectOption('Lowest to highest');
    await page.waitForTimeout(3000);
    const mobilelistsort: string[] = (await (page.locator(".shelf-container div.shelf-item").allTextContents())).map(text => text.trim());
    const afterSortArr: string[] = mobilelistsort;
    expect(mobilelistsort.length).toBe(25);
    expect(mobilearr).not.toEqual(afterSortArr);
    //console.log(afterSortArr);
    //.shelf-item__price .val

    const allprices: string[] = await page.locator(".shelf-item__price .val").allTextContents();
    console.log(allprices);
    const allnames: string[] = await page.locator(".shelf-item__title").allTextContents();
    console.log(allnames);
    expect(allprices.length).toBe(allnames.length);

    //const name_price = [...allnames, ...allprices];
    //console.log(name_price);
    for (let index = 0; index < allnames.length; index++) {
        console.log(allnames[index] + " " + allprices[index]);
    }
    const firstelement: string = await page.locator(".shelf-item__title").first().innerText();
    const firstMobilePrice: string = await page.locator(".shelf-item__price .val").first().innerText();
    console.log("First Element: ", firstelement, "First Displayed Price: ", firstMobilePrice);
    const lastelement: string = await page.locator(".shelf-item__title").last().innerText();
    const lastMobilePrice: string = await page.locator(".shelf-item__price .val").last().innerText();
    console.log("Last Element: ", lastelement, "LAst Displayed mobile Price: ", lastMobilePrice);

    await page.waitForTimeout(3000);
})