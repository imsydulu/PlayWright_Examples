import { expect, Locator, test } from '@playwright/test'

test('bootstrap datepickers: select Tirupati and open calendar', async ({ page }) => {
    // Navigate to the Booking.com homepage.
    await page.goto('https://www.booking.com/index.html')
    // Short pause to allow initial UI elements (cookie banner/modal) to render.
    await page.waitForTimeout(3000);

    // Try to find a sign-in or info dialog by role.
    const popup = page.getByRole('dialog');
    // Log visibility for debugging; useful in flaky environments.
    console.log(await popup.isVisible());
    // If the popup is visible, dismiss it by clicking the explicit dismiss button.
    if (await popup.isVisible().catch(() => false)) {
        // Use the aria-label close button to reliably dismiss the sign-in popup.
        await page.locator("[aria-label='Dismiss sign-in info.']").click();
        console.log('Sign-in popup closed');
    }

    // Additional short wait to ensure popup dismissal finishes.
    await page.waitForTimeout(2000);

    // Locate the location input and ensure it's enabled before interacting.
    const locationInput = page.locator('.da67e7a77f')
    await expect(locationInput).toBeEnabled()
    // Focus the location input to trigger suggestions.
    await locationInput.click()

    // Find the suggestion item that contains text 'Tirupati'.
    const tirupatiOption = page.locator(".e03644d405 li", { hasText: 'Tirupati' })
    // Wait up to 10s for the suggestion to appear, useful for slow networks.
    await expect(tirupatiOption).toBeVisible({ timeout: 10000 })
    // Select the desired suggestion.
    await tirupatiOption.click()

    // Locate the container that opens the date picker.
    const dateContainer = page.locator("[data-testid='searchbox-dates-container']")
    // Confirm the container is visible before clicking.
    await expect(dateContainer).toBeVisible()
    // Click to open the calendar widget.
    await dateContainer.click()
})