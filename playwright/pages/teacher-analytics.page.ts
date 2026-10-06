import { type Page, expect } from '@playwright/test';

export class TeacherAnalyticsPage {
  constructor(private page: Page) {}

  async expectHeader() {
    await expect(this.page.getByRole('heading', { name: 'Área do Professor' })).toBeVisible();
    await expect(this.page.getByText('Histórico de Experimentos')).toBeVisible();
  }

  async openCreateExperiment() {
    await this.page.getByRole('button', { name: 'Novo Experimento' }).click();
  }

  async createExperiment(data: { type: 'body-water-loss' | 'glycemic-control'; university: string; class: string }) {
    await this.openCreateExperiment();

    if (data.type === 'body-water-loss') {
      await this.page.getByLabel('Queda de Água Corporal').click();
    } else {
      await this.page.getByLabel('Controle Glicêmico').click();
    }

    await this.page.getByLabel('Universidade').fill(data.university);
    await this.page.getByLabel('Turma').fill(data.class);
    await this.page.getByRole('button', { name: 'Criar Experimento' }).click();
  }

  async expectSuccessDialog() {
    await expect(this.page.getByRole('heading', { name: 'Experimento criado com sucesso' })).toBeVisible();
  }

  async confirmOpenExperiment() {
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async findExperimentRow(pin: string) {
    return this.page.getByTestId(`experiment-row-${pin}`);
  }

  async filterByType(type: 'body-water-loss' | 'glycemic-control') {
    await this.page.getByRole('combobox', { name: 'Filtrar por tipo' }).click();
    await this.page.getByRole('option', { name: type === 'body-water-loss' ? 'Queda de Água Corporal' : 'Controle Glicêmico' }).click();
  }

  async filterByStatus(status: 'Não iniciado' | 'Em Progresso' | 'Finalizado') {
    await this.page.getByRole('combobox', { name: 'Filtrar por status' }).click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async sortByDate(order: 'recent' | 'oldest') {
    await this.page.getByRole('button', { name: order === 'recent' ? 'Mais recentes' : 'Mais antigos' }).click();
  }

  async openExperiment(pin: string) {
    const row = await this.findExperimentRow(pin);
    await row.getByTestId(`experiment-action-open-${pin}`).click();
  }

  async openEdit(pin: string) {
    const row = await this.findExperimentRow(pin);
    await row.getByTestId(`experiment-action-edit-${pin}`).click();
  }

  async openDelete(pin: string) {
    const row = await this.findExperimentRow(pin);
    await row.getByTestId(`experiment-action-delete-${pin}`).click();
  }

  async expectTableLoaded() {
    await expect(this.page.getByTestId('teacher-experiments-table')).toBeVisible();
  }

  async expectEmptyState() {
    await expect(this.page.getByText('No results.')).toBeVisible();
  }
}