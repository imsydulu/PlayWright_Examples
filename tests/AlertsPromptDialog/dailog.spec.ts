import { expect, Locator, test } from '@playwright/test'

test.skip("Working with dailoge: ", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: 'domcontentloaded' });


    const alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    await expect(alertButton).toBeVisible();

    page.once('dialog', async (dailog) => {
        expect(dailog.type()).toBe('alert');
        expect(dailog.message()).toBe('I am a JS Alert');
        await dailog.accept();
    });

    await alertButton.click();

    await expect(page.locator('#result')).toHaveText("You successfully clicked an alert");
})

test.skip("dismisses/Accept of peompt a confirmation dialog with page.on()", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: 'domcontentloaded' });
    const alertButton: Locator = page.getByRole('button', { name: 'Click for JS Confirm' });
    await expect(alertButton).toBeVisible();
    await expect(alertButton).toBeEnabled();
    console.log("name of the button:: ", await alertButton.innerText());

    const alertHandled = new Promise<string>((resolve, reject) => {
        page.on('dialog', (dialoge) => {

            try {
                expect(dialoge.type()).toBe('confirm');
                expect(dialoge.message()).toBe('I am a JS Confirm');
                // dialoge.accept();
                dialoge.dismiss();
                resolve("accepted");
            } catch (err) {
                reject(err);
            }

        })
    });

    await alertButton.click();
    await alertHandled.then((result) => {
        console.log(`Accepted::: ${result}`);
    });
    // await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

})

test.only("Prompt dialog :", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts", { waitUntil: 'domcontentloaded' });
    const promptButton: Locator = page.getByRole('button', { name: 'Click for JS Prompt' });
    await expect(promptButton).toBeVisible();
    await expect(promptButton).toBeEnabled();
    const promtTxt = 'playwright prompt'
    const promptHandled = new Promise<string>((resolve, reject) => {
        page.once('dialog', (dialog) => {
            try {
                expect(dialog.type()).toBe('prompt');
                expect(dialog.message()).toBe('I am a JS prompt');
                dialog.accept(promtTxt);
                resolve(promtTxt);
            } catch (error) {
                reject(error)
            }
        });
    });//promise ended!
    await promptButton.click();
    //await promptHandled;
    await expect(promptHandled).resolves.toBe(promtTxt);
    await expect(page.locator('#result')).toHaveText(`You entered: ${promtTxt}`);
})//test