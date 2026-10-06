import { type Page, expect } from '@playwright/test';

export class TeacherLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('E-mail').fill(email);
    await this.page.getByLabel('Senha').fill(password);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async expectValidationError() {
    await expect(this.page.getByRole('alert')).toBeVisible();
  }

  async expectApiError(message?: string) {
    const alert = this.page.getByRole('alert');
    await expect(alert).toBeVisible({ timeout: 10000 });
    if (message) {
      await expect(alert).toContainText(message);
    }
  }

  async expectRedirectToAnalytics() {
    await expect(this.page).toHaveURL(/\/teacher\/analytics/, { timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: 'Área do Professor' })).toBeVisible({ timeout: 10000 });
  }
}