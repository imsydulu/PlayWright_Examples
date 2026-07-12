import { expect, Locator, test } from '@playwright/test';
//input text / textboxes
test("verify the pwactions for inputtext/textboxes:", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const nameTextBox: Locator = page.locator("#name");
    await expect(nameTextBox).toBeVisible();
    await expect(nameTextBox).toBeEnabled();
    await nameTextBox.fill("Sydulu");
    const maxLength: string | null = await nameTextBox.getAttribute("maxlength");
    expect(maxLength).toBe('15');
    const givenValue: string = await nameTextBox.inputValue();
    console.log("Given value :", givenValue);
    expect(givenValue).toBe("Sydulu");
    await page.waitForTimeout(3000);

});

//radio buttons
test("verify the pw actions for radio buttons:", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio: Locator = page.locator('#male');
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    expect(await maleRadio.isChecked()).toBeFalsy();
    await page.waitForTimeout(3000);
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();//prefferable

    expect(await maleRadio.isChecked()).toBeTruthy();


});

test.only("verify the pw actions for checkboxes:", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sunday_checkbox: Locator = page.getByLabel('Sunday');
    //await sunday_checkbox.check();
    //await expect(sunday_checkbox).toBeChecked();

    //select all the checkboxes

    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    //uncheck the checked checkboxes
    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);

    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            //only if checked
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            //only if not checked
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    await page.waitForTimeout(3000);
    checkboxes.forEach((value, index) => {
        console.log(value, index);
    });
});