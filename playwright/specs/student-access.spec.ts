import { Page } from '@playwright/test';
import { test, expect } from '../fixtures/test';
import { ExperimentAccessPage } from '../pages/experiment-access.page';
import { ExperimentContentPage } from '../pages/experiment-content.page';
import { TeacherLoginPage } from '../pages/teacher-login.page';

test.describe('Acesso do Aluno e Conteúdo @p0', () => {
  const teacherPassword = 'E2eTest123';
  const bwlSlug = 'body-water-loss';
  const gcSlug = 'glycemic-control';
  const apiBaseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:8001';

  function uniqueEmail() {
    return `quimera-e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.test`;
  }

  async function createExperimentsViaAuthenticatedAPI(page: Page, email: string, password: string) {
    // 1. Create teacher via API first
    const teacherResponse = await page.request.post(`${apiBaseURL}/teacher/`, {
      data: { name: 'Professor E2E', email, password },
    });
    const teacherResp = await teacherResponse.json();
    if (!teacherResp._id && !teacherResp.id) {
      throw new Error(`Teacher creation failed: ${JSON.stringify(teacherResp)}`);
    }

    // 2. Login via API to get raw JWT token
    const loginResponse = await page.request.post(`${apiBaseURL}/auth/login`, {
      data: { email, password },
    });
    const loginData = await loginResponse.json();
    const token = loginData.token;
    if (!token) {
      throw new Error(`Login failed, no token returned: ${JSON.stringify(loginData)}`);
    }

    // 2. Use token in Authorization header for experiment creation
    const headers = { Authorization: `Bearer ${token}` };

    const bwlResponse = await page.request.post(`${apiBaseURL}/experiment/`, {
      headers,
      data: { type: 'body-water-loss', university: 'Universidade BWL', class: 'Turma BWL' },
    });
    const bwlExp = await bwlResponse.json();
    if (!bwlExp.pin) {
      throw new Error(`BWL experiment creation failed: ${JSON.stringify(bwlExp)}`);
    }
    const bwlPin = bwlExp.pin;
    const bwlId = bwlExp._id || bwlExp.id;

    const gcResponse = await page.request.post(`${apiBaseURL}/experiment/`, {
      headers,
      data: { type: 'glycemic-control', university: 'Universidade GC', class: 'Turma GC' },
    });
    const gcExp = await gcResponse.json();
    if (!gcExp.pin) {
      throw new Error(`GC experiment creation failed: ${JSON.stringify(gcExp)}`);
    }
    const gcPin = gcExp.pin;
    const gcId = gcExp._id || gcExp.id;

    return { bwlPin, gcPin, bwlId, gcId };
  }

  async function loginAsTeacher(page: Page, email: string, password: string) {
    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(email, password);
    await login.expectRedirectToAnalytics();
  }

  async function accessExperimentAsStudent(
    page: Page,
    slug: 'body-water-loss' | 'glycemic-control',
    pin: string,
    studentName: string
  ) {
    const access = new ExperimentAccessPage(page);
    await access.goto(slug);
    await access.fillStudentAccess(studentName, pin);
    await access.submit();
    await access.expectRedirectToContent(slug);
    // Wait for the content page to load - use a more generous timeout and wait for network idle
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Introdução' })).toBeVisible({ timeout: 30000 });
  }

  test.describe('Falhas de Acesso', () => {
    test('STU-001: Formulário de acesso vazio mostra erros', async ({ page }) => {
      const access = new ExperimentAccessPage(page);
      await access.goto(bwlSlug);
      await access.submit();
      await access.expectValidationErrors();
    });

    test('STU-002: PIN com tamanho inválido mostra erro', async ({ page }) => {
      const access = new ExperimentAccessPage(page);
      await access.goto(bwlSlug);
      await access.fillStudentAccess('Aluno Teste', '12345');
      await access.submit();
      await access.expectAccessError('Digite um PIN válido de 6 caracteres');
    });

    test('STU-003: PIN inexistente mostra erro', async ({ page }) => {
      const email = uniqueEmail();
      // Create teacher and experiment via API for this test
      await page.request.post(`${apiBaseURL}/teacher/`, {
        data: { name: 'Professor E2E', email, password: teacherPassword },
      });

      await page.request.post(`${apiBaseURL}/experiment/`, {
        data: { type: 'body-water-loss', university: 'Universidade BWL', class: 'Turma BWL' },
      });

      const login = new TeacherLoginPage(page);
      await login.goto();
      await login.login(email, teacherPassword);
      await login.expectRedirectToAnalytics();

      const access = new ExperimentAccessPage(page);
      await access.goto(bwlSlug);
      await access.fillStudentAccess('Aluno Teste', '000000');
      await access.submit();
      await access.expectAccessError();
    });
  });

  test.describe('Acesso Válido', () => {
    test('STU-004: Acesso válido BWL redireciona para conteúdo', async ({ page }) => {
      const email = uniqueEmail();
      const { bwlPin } = await createExperimentsViaAuthenticatedAPI(page, email, teacherPassword);
      await loginAsTeacher(page, email, teacherPassword);

      const studentName = 'Aluno BWL Teste';
      await accessExperimentAsStudent(page, bwlSlug, bwlPin, studentName);

      const content = new ExperimentContentPage(page);
      await content.expectIntroduction();
      await content.expectNavbar(studentName, 'Turma BWL');
    });

    test('STU-005: Acesso válido GC redireciona para conteúdo', async ({ page }) => {
      const email = uniqueEmail();
      const { gcPin } = await createExperimentsViaAuthenticatedAPI(page, email, teacherPassword);
      await loginAsTeacher(page, email, teacherPassword);

      const studentName = 'Aluno GC Teste';
      await accessExperimentAsStudent(page, gcSlug, gcPin, studentName);

      const content = new ExperimentContentPage(page);
      await content.expectIntroduction();
      await content.expectNavbar(studentName, 'Turma GC');
    });
  });

  test.describe('Navegação de Conteúdo', () => {
    test('STU-008: Navegar conteúdo didático', async ({ page }) => {
      const email = uniqueEmail();
      const { bwlPin } = await createExperimentsViaAuthenticatedAPI(page, email, teacherPassword);
      await loginAsTeacher(page, email, teacherPassword);

      const studentName = 'Aluno Conteúdo';
      await accessExperimentAsStudent(page, bwlSlug, bwlPin, studentName);

      const content = new ExperimentContentPage(page);
      await content.expectIntroduction();
      await content.goToClinicalCase();
      await content.goBack();
      await content.goToClinicalCase();
      await content.startExperiment();

      await content.expectRoomUrl(bwlSlug, bwlPin);
    });
  });
});
