import { test, expect } from '@playwright/test'

// Demo suite for grouping Playwright tests with `test.describe`
// Each describe block represents a logical test group.

test.describe('Group demo: Example.com smoke tests', () => {
  // Run this setup before each test in the group.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com')
  })

  test('should show the correct page title', async ({ page }) => {
    // Verify the page title includes the expected text.
    await expect(page).toHaveTitle(/Example Domain/)
  })

  test('should display the main heading', async ({ page }) => {
    // Check that the top heading text is exactly 'Example Domain'.
    await expect(page.locator('h1')).toHaveText('Example Domain')
  })
})

test.describe('Group demo: Links and content', () => {
  // Use a fresh page navigation for each test in this group.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com')
  })

  test('should have a visible More information link', async ({ page }) => {
    // Confirm the page contains the expected link text and that it is visible.
    await expect(page.locator('a')).toHaveText('More information...')
    await expect(page.locator('a')).toBeVisible()
  })

  test('should navigate to the linked page', async ({ page }) => {
    // Click the link and confirm the browser navigates to IANA.
    await page.click('a')
    await expect(page).toHaveURL(/iana.org/)
  })
})

test.describe('Nested group demo: layout checks', () => {
  // Nested describe blocks help organize related assertions further.
  test.describe('Header checks', () => {
    test('header should exist', async ({ page }) => {
      await page.goto('https://example.com')
      // Ensure the main heading is on the page and visible.
      await expect(page.locator('h1')).toBeVisible()
    })
  })

  test.describe('Paragraph checks', () => {
    test('paragraph should contain expected text', async ({ page }) => {
      await page.goto('https://example.com')
      // Verify the paragraph contains a known phrase from the example page.
      await expect(page.locator('p')).toContainText('illustrative examples')
    })
  })
})
