import { type Page, expect } from '@playwright/test';

export class TeacherExperimentPage {
  constructor(private page: Page) {}

  async goto(experimentId: string) {
    await this.page.goto(`/teacher/experiment/${experimentId}`);
  }

  async expectHeader(pin: string, status: string) {
    await expect(this.page.getByText(`PIN: ${pin}`)).toBeVisible();
    await expect(this.page.getByText(status)).toBeVisible();
  }

  async expectControlPanel() {
    await expect(this.page.getByTestId('control-panel')).toBeVisible();
  }

  async allowSubmissions() {
    await this.page.getByRole('switch', { name: 'Permitir Envio de Respostas' }).click();
  }

  async shareResults() {
    await this.page.getByRole('switch', { name: 'Compartilhar Resultados' }).click();
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async cancelShareResults() {
    await this.page.getByRole('switch', { name: 'Compartilhar Resultados' }).click();
    await this.page.getByRole('button', { name: 'Cancelar' }).click();
  }

  async openContent() {
    await this.page.getByRole('button', { name: 'Ver Conteúdo' }).click();
  }

  async openAnswerKey() {
    await this.page.getByRole('button', { name: 'Ver Gabarito' }).click();
  }

  async expectDashboardLoaded() {
    await expect(this.page.getByTestId('body-water-loss-chart')).toBeVisible();
  }

  async expectSocketError() {
    await expect(this.page.getByTestId('socket-error-room')).toBeVisible();
  }

  async getExperimentPin(): Promise<string> {
    const pinText = await this.page.getByText(/PIN: (\w+)/).textContent();
    const match = pinText?.match(/PIN: (\w+)/);
    return match?.[1] || '';
  }

  async getExperimentStatus(): Promise<string> {
    const statusText = await this.page.locator('[data-testid="control-panel"]').textContent();
    if (statusText?.includes('Finalizado')) return 'Finalizado';
    if (statusText?.includes('Em Progresso')) return 'Em Progresso';
    return 'Não iniciado';
  }
}