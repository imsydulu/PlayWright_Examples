import { expect, Locator, test } from '@playwright/test'

test("xpath axes", async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const country: Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(country).toHaveText("Germany");
    const countryParent: Locator = page.locator("//td[text()='Germany']/parent::tr");
    // console.log(await countryParent.allTextContents());
    //console.log(await countryParent.textContent());

    await expect(countryParent).toContainText("Maria Anders");
    //await expect(countryParent).toHaveText('Maria Anders');
    //child
    const child: Locator = page.locator("//table[@id='customers']/tbody/tr[2]/child::td");
    await expect(child).toHaveCount(3);
    //ancestors
    const ancestor: Locator = page.locator("//td[text()='UK']/ancestor::table");
    await expect(ancestor).toHaveAttribute("id", "customers");
    //descenandant
    const descenandant: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(descenandant).toHaveCount(18);
    //following and following-sibling
    const following: Locator = page.locator("//td[text()='Island Trading']/following-sibling::*");
    await expect(following).toHaveCount(await following.count());
    //preceeding sibling
    const preceeding:Locator = page.locator("//td[text()='UK']/preceding-sibling::td");
    await expect(preceeding).toHaveCount(await preceeding.count());
})