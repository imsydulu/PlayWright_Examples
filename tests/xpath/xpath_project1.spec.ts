import { expect, Locator, test } from '@playwright/test'

test("finding the element using abs.xpth", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const img: Locator = page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
    await expect(img).toBeVisible();

})

test("finding the element using the relative xpath", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const img: Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(img).toBeVisible();
    //contains

    const computer_products: Locator = page.locator("//h2/a[contains(@href,'computer')]");
    const product_count: Number = await computer_products.count();
    console.log(`Total number of products ${product_count}`);
    expect(product_count).toBeGreaterThan(0);
    //console.log(product_count.valueOf);
    console.log("First Product: ", await computer_products.first().textContent());
    console.log("Last Product: ", await computer_products.last().textContent());
    console.log("nth Product: ", await computer_products.nth(2).textContent());
    console.log("All Products: ", await computer_products.allTextContents());
    for (const arrelement of await computer_products.allTextContents()) {

        console.log("Element: ", arrelement);

    }


})

test.only("Start-with xpath locators:", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const buidingProds: Locator = page.locator("//h2/a[starts-with(@href,'/build')]");
    console.log("count of products: ", await buidingProds.count());
    const login: Locator = page.locator("//a[text()='Log in']");
    await expect(login).toBeVisible();
    const last_elelemt:Locator=page.locator("//div[@class='column follow-us']/ul/li[last()]");
    await expect(last_elelemt).toBeVisible();
    console.log(await last_elelemt.textContent());
    
})