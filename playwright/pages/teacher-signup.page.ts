import { type Page, expect } from '@playwright/test';

export class TeacherSignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/signup');
  }

  async fillForm(name: string, email: string, password: string) {
    await this.page.getByLabel('Nome').fill(name);
    await this.page.getByLabel('E-mail').fill(email);
    await this.page.getByLabel('Senha').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click();
  }

  async expectSuccessDialog() {
    await expect(this.page.getByRole('heading', { name: 'Cadastro realizado com sucesso!' })).toBeVisible();
  }

  async confirmGoToLogin() {
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async expectValidationErrors() {
    await expect(this.page.getByRole('alert')).toBeVisible();
  }
}