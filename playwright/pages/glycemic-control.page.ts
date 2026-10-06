import { type Page, expect } from '@playwright/test';

export class GlycemicControlPage {
  constructor(private page: Page) {}

  async expectWaitingRoom(message = 'O professor logo irá liberar a sala do experimento.') {
    await expect(this.page.getByTestId('student-experiment-room-gc')).toBeVisible();
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectQuestions() {
    for (let i = 1; i <= 5; i++) {
      await expect(this.page.getByRole('heading', { name: `Questão ${i}` })).toBeVisible();
    }
  }

  async answerQuestion(number: number, option: string) {
    await this.page.getByRole('radio', { name: option }).click();
  }

  async answerAll(options: string[]) {
    for (let i = 0; i < options.length; i++) {
      await this.answerQuestion(i + 1, options[i]);
    }
  }

  async submitAnswers() {
    await this.page.getByRole('button', { name: 'Enviar Respostas' }).click();
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
  }

  async expectQuestionComparison() {
    await expect(this.page.getByText('Comparação de Respostas')).toBeVisible();
  }

  async expectResult(score: number) {
    await expect(this.page.getByTestId('student-experiment-room-gc')).toBeVisible();
    await expect(this.page.getByText(`${score} pontos`)).toBeVisible();
  }

  async expectClassChart() {
    await expect(this.page.getByTestId('glycemic-control-chart')).toBeVisible();
  }

  async getSessionStorageResponse(): Promise<string | null> {
    return await this.page.evaluate(() => sessionStorage.getItem('student-response'));
  }
}