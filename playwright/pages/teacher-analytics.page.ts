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

  async createExperiment(data: {
    type: 'body-water-loss' | 'glycemic-control';
    university: string;
    class: string;
  }) {
    await this.openCreateExperiment();

    const typeId =
      data.type === 'body-water-loss'
        ? 'experiment-type-body-water-loss'
        : 'experiment-type-glycemic-control';
    await this.page.getByTestId(typeId).click();

    await this.page.getByLabel('Universidade').fill(data.university);
    await this.page.getByLabel('Turma').fill(data.class);
    await this.page.getByRole('button', { name: 'Criar Experimento' }).click();
  }

  async expectSuccessDialog() {
    await expect(
      this.page.getByRole('heading', { name: 'Experimento criado com sucesso' })
    ).toBeVisible();
  }

  async confirmOpenExperiment() {
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async findExperimentRow(experimentId: string) {
    return this.page.getByTestId(`experiment-row-${experimentId}`);
  }

  async filterByType(type: 'body-water-loss' | 'glycemic-control') {
    await this.page.getByTestId('filter-type-trigger').click();
    await this.page
      .getByRole('option', {
        name: type === 'body-water-loss' ? 'Queda de Água Corporal' : 'Controle Glicêmico',
      })
      .click();
  }

  async filterByStatus(status: 'Não iniciado' | 'Em Progresso' | 'Finalizado') {
    await this.page.getByTestId('filter-status-trigger').click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async sortByDate(order: 'recent' | 'oldest') {
    await this.page.getByTestId('filter-sort-trigger').click();
    await this.page
      .getByRole('option', { name: order === 'recent' ? 'Mais Recente' : 'Mais Antigo' })
      .click();
  }

  async openExperiment(experimentId: string) {
    const row = await this.findExperimentRow(experimentId);
    await row.getByTestId(`experiment-action-open-${experimentId}`).click();
  }

  async openEdit(experimentId: string) {
    const row = await this.findExperimentRow(experimentId);
    await row.locator('button[aria-haspopup="menu"]').first().click();
    await this.page.getByTestId(`experiment-action-edit-${experimentId}`).click();
  }

  async openDelete(experimentId: string) {
    const row = await this.findExperimentRow(experimentId);
    await row.locator('button[aria-haspopup="menu"]').first().click();
    await this.page.getByTestId(`experiment-action-delete-${experimentId}`).click();
  }

  async expectTableLoaded() {
    await expect(this.page.getByTestId('teacher-experiments-table')).toBeVisible();
  }

  async expectEmptyState() {
    await expect(this.page.getByText('No results.')).toBeVisible();
  }
}
