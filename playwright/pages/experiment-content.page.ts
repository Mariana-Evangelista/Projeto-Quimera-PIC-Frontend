import { type Page, expect } from '@playwright/test';

export class ExperimentContentPage {
  constructor(private page: Page) {}

  async expectIntroduction() {
    await expect(this.page.getByRole('heading', { name: 'Introdução' })).toBeVisible();
  }

  async goToClinicalCase() {
    await this.page.getByRole('button', { name: 'Próximo' }).click();
    await expect(this.page.getByRole('heading', { name: 'Caso Clínico' })).toBeVisible();
  }

  async goBack() {
    await this.page.getByRole('button', { name: 'Voltar' }).click();
  }

  async startExperiment() {
    await this.page.getByRole('button', { name: 'Iniciar Tratamento' }).click();
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async expectRoomUrl(slug: string, pin: string) {
    await expect(this.page).toHaveURL(new RegExp(`/experiment/${slug}/${pin}\\?start_experiment_room=true`));
  }

  async expectNavbar(studentName: string, className: string) {
    await expect(this.page.getByText(`Olá, ${studentName}`)).toBeVisible();
    await expect(this.page.getByText(`Turma ${className}`)).toBeVisible();
  }
}