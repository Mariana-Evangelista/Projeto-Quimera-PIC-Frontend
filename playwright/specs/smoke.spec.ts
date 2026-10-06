import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { NotFoundPage } from '../pages/not-found.page';

test.describe('Smoke @smoke @p0', () => {
  test('SMK-001: Home carrega corretamente', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectLoaded();

    await expect(page.getByText('Queda de Água Corporal')).toBeVisible();
    await expect(page.getByText('Controle Glicêmico')).toBeVisible();
  });

  test('SMK-002: Rota inexistente mostra página 404', async ({ page }) => {
    const notFound = new NotFoundPage(page);
    await notFound.goto('/rota-inexistente');
    await notFound.expectNotFound();

    await expect(page.getByText('A página que você procura não existe ou foi movida.')).toBeVisible();
  });
});