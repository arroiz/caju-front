import { test, expect } from '@playwright/test';

test.describe('Render page scenarios', () => {
  test('should render the page', async ({ page }) => {
    await page.goto('http://localhost:3001/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Plataforma de Admissão' })).toBeVisible();
    await expect(page.getByPlaceholder('Digite um CPF válido')).toBeVisible();
    await expect(page.getByLabel('refetch')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Nova Admissão' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pronto para revisar' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aprovado' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reprovado' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Filipe Marins' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Luiz Filho' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'José Leão' })).toBeVisible();
  });

  test('should navigate to the new job application page when the link is clicked', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001/#/dashboard');
    page.getByRole('link', { name: 'Nova Admissão' }).click();
    await expect(page).toHaveURL(/.*\/new-job-application/);
  });

  test('should render loading indicator while page is loading', async ({ page }) => {
    await page.route('**/job-applications', (route) => route.abort());
    await page.goto('http://localhost:3001/#/dashboard');
    await expect(page.locator('div[aria-label="carregando"]')).toBeVisible();
  });

  test('should render a error message and empty message when the job applications request fails', async ({
    page,
  }) => {
    await page.route('**/job-applications', (route) => route.abort());
    await page.goto('http://localhost:3001/#/dashboard');
    await page.locator('div[aria-label="carregando"]').waitFor({
      state: 'detached',
    });
    await expect(page.getByText('Falha ao carregar candidaturas.')).toBeVisible();
    await expect(page.getByText('Nenhuma candidatura disponível.')).toBeVisible();
  });
});
