import { test, expect } from '../fixtures/test';
import { TeacherLoginPage } from '../pages/teacher-login.page';
import { TeacherSignupPage } from '../pages/teacher-signup.page';

test.describe('Autenticação do Professor @p0', () => {
  let teacherEmail: string;
  const teacherPassword = 'E2eTest123';

  test.beforeEach(async () => {
    const timestamp = Date.now();
    teacherEmail = `quimera-e2e-${timestamp}@example.test`;
  });

  test('AUTH-001: Cadastro válido de professor', async ({ page }) => {
    const signup = new TeacherSignupPage(page);
    await signup.goto();
    await signup.fillForm('Professor E2E Teste', teacherEmail, teacherPassword);
    await signup.submit();
    await signup.expectSuccessDialog();
    await signup.confirmGoToLogin();
    await expect(page).toHaveURL(/\/login/);
  });

  test('AUTH-002: Validação client-side do cadastro', async ({ page }) => {
    const signup = new TeacherSignupPage(page);
    await signup.goto();

    await signup.submit();
    await signup.expectValidationErrors();

    await signup.fillForm('', 'email-invalido', '123');
    await signup.submit();
    await signup.expectValidationErrors();

    await expect(page).toHaveURL(/\/signup/);
  });

  test('AUTH-003: E-mail duplicado no cadastro', async ({ page, api }) => {
    const timestamp = Date.now();
    const duplicateEmail = `dup-${timestamp}@example.test`;

    await api.post('/teacher/', {
      data: { name: 'Professor Duplicado', email: duplicateEmail, password: teacherPassword },
    });

    const signup = new TeacherSignupPage(page);
    await signup.goto();
    await signup.fillForm('Professor Duplicado', duplicateEmail, teacherPassword);
    await signup.submit();
    await signup.expectApiError('E-mail já cadastrado');
  });

  test('AUTH-004: Login válido', async ({ page, api }) => {
    const timestamp = Date.now();
    const email = `login-${timestamp}@example.test`;
    await api.post('/teacher/', {
      data: { name: 'Professor Login', email, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(email, teacherPassword);
    await login.expectRedirectToAnalytics();

    await expect(page.getByText('Olá, Professor')).toBeVisible();
  });

  test('AUTH-005: Login inválido', async ({ page }) => {
    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login('inexistente@test.com', 'SenhaErrada123!');
    await login.expectApiError();
    await expect(page).toHaveURL(/\/login/);
  });

  test('AUTH-006: Acesso anônimo à área do professor redireciona para home', async ({ page }) => {
    await page.goto('/teacher/analytics');
    await expect(page).toHaveURL(/\/$/);
  });

  test('AUTH-007: Professor autenticado tentando acessar login/signup é redirecionado', async ({
    page,
    api,
  }) => {
    const timestamp = Date.now();
    const email = `auth-${timestamp}@example.test`;
    await api.post('/teacher/', {
      data: { name: 'Professor Auth', email, password: teacherPassword },
    });

    const login = new TeacherLoginPage(page);
    await login.goto();
    await login.login(email, teacherPassword);
    await login.expectRedirectToAnalytics();

    await page.goto('/login');
    await expect(page).toHaveURL(/\/teacher/);

    await page.goto('/signup');
    await expect(page).toHaveURL(/\/teacher/);
  });
});
