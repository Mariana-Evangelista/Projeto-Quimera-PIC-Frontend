import { type Page, expect } from '@playwright/test';

export class BodyWaterLossPage {
  constructor(private page: Page) {}

  async expectWaitingRoom(message = 'O professor logo irá liberar a sala do experimento.') {
    await expect(this.page.getByTestId('student-experiment-room-bwl')).toBeVisible();
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectQuestions() {
    await expect(this.page.getByRole('heading', { name: 'Questão 1' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Questão 2' })).toBeVisible();
  }

  async answerFirstQuestion(value: string) {
    await this.page.getByRole('radio', { name: value }).click();
  }

  async answerSecondQuestion(value: string) {
    await this.page.getByRole('radio', { name: value }).click();
  }

  async submitAnswers() {
    await this.page.getByRole('button', { name: 'Enviar Respostas' }).click();
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async expectResult(score: number) {
    await expect(this.page.getByTestId('student-experiment-room-bwl')).toBeVisible();
    await expect(this.page.getByText(`${score} pontos`)).toBeVisible();
  }

  async expectClassChart() {
    await expect(this.page.getByTestId('body-water-loss-chart')).toBeVisible();
  }

  async getSessionStorageScore(): Promise<string | null> {
    return await this.page.evaluate(() => sessionStorage.getItem('student-score'));
  }
}