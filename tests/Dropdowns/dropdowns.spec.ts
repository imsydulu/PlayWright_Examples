import { expect, Locator, test } from '@playwright/test'

test("working with dropdwons: ", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countryLocator: Locator = page.locator("#country");
    await countryLocator.scrollIntoViewIfNeeded();
    // await countryLocator.selectOption('India');
    //await countryLocator.selectOption({ value:"canada" });
    // await countryLocator.selectOption({ label: 'India' });
    await countryLocator.selectOption({ index: 3 });
    //check no of options & count
    const allcounties: Locator = page.locator("#country option");
    const totolcount: number = await allcounties.count();
    console.log("Total elements/Countries:  ", totolcount);
    expect(totolcount).toBe(10);
    await expect(allcounties).toHaveCount(10);

    await page.waitForTimeout(3000);
    //check option/text present in dropdown
    const allCountryTexts: string[] = (await allcounties.allTextContents()).map(text => text.trim());
    //console.log(allCountryTexts);
    expect(allCountryTexts).toContain('India');
    //printing options from the drop dwon

    for (const text of allCountryTexts) {
        console.log(text);
    }


});

test.only("working with multi select dropdown: ", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.mouse.wheel(0, 750);

    //await page.locator("#colors").selectOption(['Red', 'Blue', 'Green']);
    // await page.locator('#colors').selectOption(['white','red','green']);
    //await page.locator('#colors').selectOption([{ label: 'white' }, { label: 'red' }, { label: 'green' }]);
    await page.locator('#colors').selectOption([{ index: 0 }, { index: 2 }, { index: 3 }]);
    //check the number of options
    const alloptions: Locator = page.locator("#colors option");
    expect(alloptions).toHaveCount(7);

    await page.waitForTimeout(3000);
    //check the option present in dropdwon/

    const allOptionTexts: string[] = (await alloptions.allInnerTexts()).map(text => text.trim());
    console.log(allOptionTexts);
    expect(allOptionTexts).toContain('Green');
    //printing the options
    for (const option of allOptionTexts) {
        console.log(option);
    }


});