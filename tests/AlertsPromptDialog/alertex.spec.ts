import { expect, test } from '@playwright/test';

test('accepts a JavaScript alert and verifies the result', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts', {
        waitUntil: 'domcontentloaded',
    });

    const alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    await expect(alertButton).toBeVisible();

    // Accept the browser alert as soon as it opens; an unhandled alert blocks
    // the click action that triggered it.
    const dialogHandled = new Promise<void>((resolve, reject) => {
        page.once('dialog', async (dialog) => {
            try {
                console.log('dialog message:', dialog.message());
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('I am a JS Alert');
                await dialog.accept();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    await alertButton.click();
    await dialogHandled;

    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

test.skip('dismisses a confirmation dialog with page.on()', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts', {
        waitUntil: 'domcontentloaded',
    });

    let dialogType = '';
    let dialogMessage = '';

    // page.on listens for every matching event while this page is open.
    // Use it when a page can show more than one dialog during a workflow.
    const dialogHandled = new Promise<void>((resolve) => {
        page.on('dialog', async (dialog) => {
            dialogType = dialog.type();
            dialogMessage = dialog.message();

            // dismiss() clicks Cancel in a confirmation dialog.
            await dialog.dismiss();
            resolve();
        });
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await dialogHandled;

    expect(dialogType).toBe('confirm');
    expect(dialogMessage).toBe('I am a JS Confirm');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});
