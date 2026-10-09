import { type Page, expect } from '@playwright/test';

export class ExperimentAccessPage {
  constructor(private page: Page) {}

  async goto(slug: 'body-water-loss' | 'glycemic-control') {
    await this.page.goto(`/experiment/${slug}`);
  }

  async fillStudentAccess(name: string, pin: string) {
    await this.page.getByLabel('Nome do Aluno').fill(name);
    await this.page.getByLabel('PIN').fill(pin);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async expectAccessError(message?: string) {
    const alert = this.page.getByRole('alert').first();
    await expect(alert).toBeVisible();
    if (message) {
      await expect(alert).toContainText(message);
    }
  }

  async expectRedirectToContent(slug: 'body-water-loss' | 'glycemic-control') {
    await expect(this.page).toHaveURL(new RegExp(`/experiment/${slug}(\\?.*)?$`));
  }

  async expectValidationErrors() {
    await expect(this.page.getByText('Campo obrigatório').first()).toBeVisible();
  }
}
