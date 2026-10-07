import { type Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: /Seja bem-vindo.*QUIMERA/i })).toBeVisible();
    await expect(this.page.getByText('Somos uma plataforma que permite a criação de experimentos interativos')).toBeVisible();
  }

  async openExperiment(slug: 'body-water-loss' | 'glycemic-control') {
    const title = slug === 'body-water-loss' ? 'Queda de Água Corporal' : 'Controle Glicêmico';
    await this.page.getByRole('heading', { name: title }).click();
    await expect(this.page).toHaveURL(new RegExp(`/experiment/${slug}$`));
  }

  async goToTeacherLogin() {
    await this.page.getByRole('link', { name: 'Área do Professor' }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}