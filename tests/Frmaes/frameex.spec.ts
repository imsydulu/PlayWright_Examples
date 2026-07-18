import { expect, test } from '@playwright/test'

test('validate that a webpage inside a frame', async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/', { waitUntil: 'domcontentloaded' })

    //const frameFive = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_5' });
    const frameFive = page.frameLocator('[src="frame_5.html"]');
    //console.log("Frame 5 Name : ", expect(frameFive).);
    //const inputbox = frameFive.getByRole('textbox', { name: 'mytext5' });
    if (!frameFive) {
        throw new Error('Frame5 is not found!!!');
    }
    const inputbox = frameFive.getByRole('textbox');
    await expect(inputbox).toBeVisible();
    await inputbox.fill('Welcome to Frmae 5: ');
    console.log("given input txt:  ", await inputbox.inputValue());
    const linkinframe = frameFive.locator("[href*='https://a9t9.com']");

    if (await linkinframe.isVisible().catch(() => false)) {
        await linkinframe.click();
        const logo = frameFive.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation');
        await expect(logo).toBeVisible();

    }

    await page.waitForTimeout(2000);
})