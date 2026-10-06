import { type Page, type Locator, expect } from '@playwright/test';

export async function expectToBeVisible(locator: Locator, timeout = 8000) {
  await expect(locator).toBeVisible({ timeout });
}

export async function expectToHaveURL(page: Page, url: RegExp | string, timeout = 8000) {
  await expect(page).toHaveURL(url, { timeout });
}

export async function expectToContainText(locator: Locator, text: string, timeout = 8000) {
  await expect(locator).toContainText(text, { timeout });
}

export async function expectNotToBeVisible(locator: Locator, timeout = 8000) {
  await expect(locator).not.toBeVisible({ timeout });
}

export async function waitForApiResponse(page: Page, urlPattern: RegExp, timeout = 10000) {
  return page.waitForResponse(response => urlPattern.test(response.url()) && response.status() < 400, { timeout });
}

export async function waitForSocketConnection(page: Page, testId: string, timeout = 15000) {
  await expect(page.getByTestId(testId)).toBeVisible({ timeout });
}

export async function expectExperimentStatus(page: Page, expectedStatus: string) {
  const statusText = await page.locator('[data-testid="control-panel"]').textContent();
  expect(statusText).toContain(expectedStatus);
}

export async function expectStudentSessionData(page: Page, key: 'student-score' | 'student-response') {
  const value = await page.evaluate((k) => sessionStorage.getItem(k), key);
  expect(value).not.toBeNull();
  return value;
}