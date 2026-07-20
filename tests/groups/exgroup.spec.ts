import { test, expect } from '@playwright/test'

// Real-time example of Playwright groups using test.describe.
// This demo uses the DEMOQA homepage to show practical group behavior.
let count = 1;
//first describe
test.describe('Real-time group example: demoqa.com', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the demo site before each test.
        console.log('beforeeach is executed!!!!!!!!!!', count++);

        await page.goto('https://demoqa.com/')
    })
    //describe has two tests
    test.describe('Smoke tests', () => {
        test('page should have the expected title', async ({ page }) => {
            await expect(page).toHaveTitle('demosite')
        })

        test('home banner should display DEMOQA text', async ({ page }) => {
            await expect(page.locator('.home-banner')).toContainText(' ')
        })
    })

    //describe for card navigation
    test.describe('Card navigation', () => {
        test('Elements card should be visible', async ({ page }) => {
            const elementsCard = page.getByText('Elements').first()
            await expect(elementsCard).toBeVisible()
        })

        test('clicking the Elements card should open the Elements page', async ({ page }) => {
            await page.getByText('Elements').first().click()
            await expect(page).toHaveURL(/elements/)
            //await expect(page.locator('.main-header')).toHaveText('Elements')
        })
    })
    //nested groups 'describe inside describe'
    test.describe('Nested checks for page content', () => {
        test.describe('Header checks', () => {
            test('home page header should be displayed', async ({ page }) => {
                await expect(page.locator('div.home-banner')).toBeVisible()
            })
        })

        test.describe('Footer checks', () => {
            test('footer should contain a copyright message', async ({ page }) => {
                await expect(page.locator('footer')).toContainText('TOOLSQA.COM')
            })
        })
    })
})
