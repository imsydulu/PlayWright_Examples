import { expect, Frame, test } from '@playwright/test'

test.skip("working with frames:  ", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/iframe-demo/");
    const totolfrmaes: Frame[] = page.frames();
    console.log('Totol frames in the page:: ', totolfrmaes.length);

    for (const frame of totolfrmaes) {
        console.log("frmae: ", frame.name());
    }



})

test.skip("working with frames in uivision:", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const totolfrmaes: Frame[] = page.frames();
    console.log(totolfrmaes.length);
    for (const frame of totolfrmaes) {
        console.log("Frame:  ", frame.name());
    }

    //
    const yellowframe: Frame | null = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1" });
    if (yellowframe && await yellowframe.locator("[name='mytext1']").isVisible().catch(() => false)) {
        console.log("object is visible====");
        await yellowframe.locator("[name='mytext1']").fill("Hello!!!!!!!!");
    }
    await page.waitForTimeout(2000);
})

test.skip('fills a field inside the first UI.Vision frame', async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/', {
        waitUntil: 'domcontentloaded',
    });

    // frameLocator waits for the frame element and scopes every locator to
    // its document, avoiding a timing race from an immediate page.frame() call.
    const textInput = page
        .frameLocator('frame[src="frame_1.html"]')
        .getByRole('textbox');
    await expect(textInput).toBeVisible();

    const message = 'Hello from Playwright';
    await textInput.fill(message);
    await expect(textInput).toHaveValue(message);
    await page.waitForTimeout(2000);
});

test.only("Working with another frame from UI.vision: ", async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/', {
        waitUntil: 'domcontentloaded'
    });
    const textInput = page.frameLocator('frame[src="frame_2.html"]').getByRole('textbox');
    await expect(textInput).toBeVisible();

    const messsage = "Hello From frame2";
    await textInput.fill(messsage);
    //await expect(textInput).toHaveText(/frame2/);
    await expect(textInput).toHaveValue(messsage);
    await page.waitForTimeout(2000);
})
