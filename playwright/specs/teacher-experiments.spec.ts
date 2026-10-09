import { Page } from '@playwright/test';
import { test, expect } from '../fixtures/test';
import { TeacherAnalyticsPage } from '../pages/teacher-analytics.page';
import { TeacherExperimentPage } from '../pages/teacher-experiment.page';
import { TeacherLoginPage } from '../pages/teacher-login.page';

test.describe('Gestão de Experimentos @p0', () => {
  let teacherEmail: string;
  const teacherPassword = 'E2eTest123';

  test.beforeEach(async () => {
    const timestamp = Date.now();
    teacherEmail = `quimera-e2e-${timestamp}@example.test`;
  });

  async function ensureAnalyticsPage(page: Page) {
    await page.goto('/teacher/analytics');
    await expect(page.getByRole('heading', { name: 'Área do Professor' })).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText('Histórico de Experimentos')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('teacher-experiments-table')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('filter-type-trigger')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('filter-status-trigger')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('filter-sort-trigger')).toBeVisible({ timeout: 15000 });
  }

  test('EXP-001: Analytics vazio', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-001', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.expectHeader();
    await analytics.expectEmptyState();
  });

  test('EXP-002: Criar BWL', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-002', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Universidade E2E BWL',
      class: 'Turma E2E BWL',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();

    const experimentPage = new TeacherExperimentPage(page);
    const pin = await experimentPage.getExperimentPin();
    await experimentPage.expectHeader(pin, 'Não iniciado');
    await experimentPage.expectControlPanel();
  });

  test('EXP-003: Criar GC', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-003', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'glycemic-control',
      university: 'Universidade E2E GC',
      class: 'Turma E2E GC',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();

    const experimentPage = new TeacherExperimentPage(page);
    const pin = await experimentPage.getExperimentPin();
    await experimentPage.expectHeader(pin, 'Não iniciado');
    await experimentPage.expectControlPanel();
  });

  test('EXP-004: Criar inválido', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-004', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.openCreateExperiment();
    await page.getByRole('button', { name: 'Criar Experimento' }).click();

    await expect(page.getByText('Campo obrigatório').first()).toBeVisible();
  });

  test('EXP-005: Editar experimento', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-005', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Universidade Original',
      class: 'Turma Original',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);

    const experimentPage = new TeacherExperimentPage(page);
    const experimentId = await experimentPage.getExperimentId();

    await page.goto('/teacher');
    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();

    await analytics.openEdit(experimentId);
    await page.getByLabel('Universidade').fill('Universidade Editada');
    await page.getByLabel('Turma').fill('Turma Editada');
    await page.getByRole('button', { name: 'Editar Experimento' }).click();

    await expect(
      page.getByRole('heading', { name: 'Experimento atualizado com sucesso' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();
    await expect(page.getByText('Universidade Editada')).toBeVisible();
    await expect(page.getByText('Turma Editada')).toBeVisible();
  });

  test('EXP-006: Excluir cancelando', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-006', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Universidade Para Excluir',
      class: 'Turma Para Excluir',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);

    const experimentPage = new TeacherExperimentPage(page);
    const experimentId = await experimentPage.getExperimentId();

    await page.goto('/teacher');
    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();

    await analytics.openDelete(experimentId);
    await page.getByRole('button', { name: 'Cancelar' }).click();

    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();
    await expect(
      page.getByTestId('teacher-experiments-table').getByText('Universidade Para Excluir')
    ).toBeVisible();
  });

  test('EXP-007: Excluir confirmando', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-007', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Universidade Para Excluir Confirmado',
      class: 'Turma Para Excluir Confirmado',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);

    const experimentPage = new TeacherExperimentPage(page);
    const experimentId = await experimentPage.getExperimentId();

    await page.goto('/teacher');
    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();

    await analytics.openDelete(experimentId);
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.waitForTimeout(1000);
    await ensureAnalyticsPage(page);
    await analytics.expectTableLoaded();
    await expect(
      page
        .getByTestId('teacher-experiments-table')
        .getByText('Universidade Para Excluir Confirmado')
    ).not.toBeVisible();
  });

  test('EXP-008: Filtrar tabela', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-008', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    await ensureAnalyticsPage(page);

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Uni BWL',
      class: 'Turma BWL',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);
    await page.goto('/teacher');
    await ensureAnalyticsPage(page);

    await analytics.createExperiment({
      type: 'glycemic-control',
      university: 'Uni GC',
      class: 'Turma GC',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);
    await page.goto('/teacher');
    await ensureAnalyticsPage(page);

    await analytics.expectTableLoaded();

    await analytics.filterByType('body-water-loss');
    await expect(page.getByText('Uni BWL')).toBeVisible();
    await expect(page.getByText('Uni GC')).not.toBeVisible();

    await analytics.filterByType('glycemic-control');
    await expect(page.getByText('Uni GC')).toBeVisible();
    await expect(page.getByText('Uni BWL')).not.toBeVisible();

    await analytics.filterByType('body-water-loss');
    await analytics.filterByStatus('Não iniciado');
    await expect(
      page.getByTestId('teacher-experiments-table').getByText('Não iniciado')
    ).toBeVisible();
  });

  test('EXP-009: Ordenar tabela', async ({ page, api }) => {
    await api.post('/teacher/', {
      data: { name: 'Professor EXP-009', email: teacherEmail, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(teacherEmail, teacherPassword);
    await login.expectRedirectToAnalytics();

    await ensureAnalyticsPage(page);

    const analytics = new TeacherAnalyticsPage(page);
    await analytics.createExperiment({
      type: 'body-water-loss',
      university: 'Primeiro',
      class: 'Turma 1',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);
    await page.goto('/teacher');
    await ensureAnalyticsPage(page);

    await new Promise((r) => setTimeout(r, 100));

    await analytics.createExperiment({
      type: 'glycemic-control',
      university: 'Segundo',
      class: 'Turma 2',
    });
    await analytics.expectSuccessDialog();
    await analytics.confirmOpenExperiment();
    await page.waitForURL(/\/teacher\/experiment\/[a-f0-9]{24}/);
    await page.goto('/teacher');
    await ensureAnalyticsPage(page);

    await analytics.expectTableLoaded();

    const firstRowUniversity = page
      .locator('[data-testid^="experiment-row-"]')
      .first()
      .locator('td')
      .nth(2);
    await expect(firstRowUniversity).toContainText('Segundo');

    await analytics.sortByDate('oldest');
    await expect(firstRowUniversity).toContainText('Primeiro');
  });
});
