import { type Page, expect } from '@playwright/test';

export class TeacherExperimentPage {
  constructor(private page: Page) {}

  async goto(experimentId: string) {
    await this.page.goto(`/teacher/experiment/${experimentId}`);
  }

  async expectHeader(pin: string, status: string) {
    await expect(this.page.getByTestId('experiment-pin')).toHaveText(pin);
    await expect(this.page.locator('header').getByText(status)).toBeVisible();
  }

  async expectControlPanel() {
    await expect(this.page.getByTestId('control-panel')).toBeVisible();
  }

  async allowSubmissions() {
    await this.page.getByTestId('liberate-send-response').click();
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
    await expect(this.page.getByTestId('experiment-pin')).toBeVisible({ timeout: 10000 });
    return (await this.page.getByTestId('experiment-pin').textContent())?.trim() || '';
  }

  async getExperimentId(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/\/teacher\/experiment\/([a-f0-9]{24})/);
    return match?.[1] || '';
  }

  async getExperimentStatus(): Promise<string> {
    const statusText = await this.page.locator('[data-testid="control-panel"]').textContent();
    if (statusText?.includes('Finalizado')) return 'Finalizado';
    if (statusText?.includes('Em Progresso')) return 'Em Progresso';
    return 'Não iniciado';
  }
}
