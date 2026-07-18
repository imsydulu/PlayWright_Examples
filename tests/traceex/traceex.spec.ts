import { expect, test } from '@playwright/test'

test("Working with the trace :", async ({ page, context }) => {

    context.tracing.start({ screenshots: true, snapshots: true })
    await page.goto('https://www.demoblaze.com/', { waitUntil: 'domcontentloaded' });
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Welcome pavanol' })).toBeVisible();
    context.tracing.stop({path:'trace.zip'})
})