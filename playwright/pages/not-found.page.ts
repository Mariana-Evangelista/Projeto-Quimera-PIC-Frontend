import { type Page, expect } from '@playwright/test';

export class NotFoundPage {
  constructor(private page: Page) {}

  async goto(path: string = '/rota-inexistente') {
    await this.page.goto(path);
  }

  async expectNotFound() {
    await expect(this.page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Voltar para a Home' })).toBeVisible();
  }
}