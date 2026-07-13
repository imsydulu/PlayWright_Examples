import { Locator, test } from '@playwright/test'

test("Bootstrap dropdowns:", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    //finding username
    await page.locator("[name='username']").fill('Admin');
    //finding the password field
    await page.locator("[name='password']").fill('admin123');
    //finding the login button
    await page.locator("[type='submit']").click();
    //wait for 'PIM' button and perform click it
    await (await page.waitForSelector("[href*='pim/viewPim']")).click();
    //click on the job title dropdown
    await page.locator("//label[text()='Job Title']/parent::div/following-sibling::div").click();
    await page.waitForTimeout(3000);
    //const jobtitlelist: string[] = await page.locator("[role='listbox']").allTextContents();
    const jobtitles: Locator = page.locator("[role='listbox'] div");
    console.log("Totol Dropdown Elements: ", await jobtitles.count());

    for (let index = 1; index < await jobtitles.count(); index++) {
       // console.log(await jobtitles.nth(index).textContent());

        if ((await jobtitles.nth(index).textContent())?.trim() === "Automation Tester001") {
            console.log("automation tester");
            
            await jobtitles.nth(index).click();
            break;
        }

    }
    await page.waitForTimeout(5000);
});