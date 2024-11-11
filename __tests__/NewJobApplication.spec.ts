import { test, expect, Page } from '@playwright/test';

const fillFormWithCorrectValues = async (page: Page) => {
  await page.getByPlaceholder('Nome').fill('candidatura teste');
  await page.getByPlaceholder('Email').fill('teste@gmail.com');
  await page.getByPlaceholder('CPF').fill('440.229.030-90');
  await page.getByTestId('application-date-input').fill('2024-02-20');
};

test('should render new job application page with form, fields and back button', async ({
  page,
}) => {
  await page.goto('/#/new-job-application');
  await expect(page.getByLabel('voltar')).toBeVisible();
  await expect(page.getByPlaceholder('Nome')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('CPF')).toBeVisible();
  await expect(page.getByTestId('application-date-input')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cadastrar' })).toBeVisible();
});

test('should navigate to dashboard when back button is clicked', async ({ page }) => {
  await page.goto('/#/new-job-application');
  await page.getByLabel('voltar').click();
  await expect(page).toHaveURL(/.*\/dashboard/);
});

test.describe('Forming validation scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/new-job-application');
  });

  test('should show error inputs when click on register button before filling the form', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('O nome completo deve ter pelo menos 2 letras')).toBeVisible();
    await expect(page.getByText('Por favor, insira um e-mail válido')).toBeVisible();
    await expect(page.getByText('CPF inválido.')).toBeVisible();
    await expect(page.getByText('Data de admissão inválida.')).toBeVisible();
  });

  test('should show name input validation error messages', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('O nome completo deve ter pelo menos 2 letras.')).toBeVisible();
    await page.getByPlaceholder('Nome').click();
    await page.getByPlaceholder('Nome').fill('1a');
    await expect(page.getByText('O nome completo não pode começar com um número.')).toBeVisible();
    await page.getByPlaceholder('Nome').click();
    await page.getByPlaceholder('Nome').press('ControlOrMeta+a');
    await page.getByPlaceholder('Nome').fill('marcos');
    await expect(page.getByText('O nome completo deve ter pelo menos um espaço.')).toBeVisible();
    await page.getByPlaceholder('Nome').click();
    await page.getByPlaceholder('Nome').fill('marcos taron');
    await page.getByPlaceholder('Nome').click();
    await expect(
      page.getByText('O nome completo não pode começar com um número'),
    ).not.toBeVisible();
    await expect(page.getByText('O nome completo deve ter pelo menos 2 letras')).not.toBeVisible();
    await expect(page.getByText('O nome completo deve ter pelo menos um espaço')).not.toBeVisible();
  });

  test('should show email input validation error messages', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('Por favor, insira um e-mail válido.')).toBeVisible();
    await page.getByPlaceholder('Email').fill('marcos');
    await expect(page.getByText('Por favor, insira um e-mail válido.')).toBeVisible();
    await page.getByPlaceholder('Email').fill('marcostaron@');
    await expect(page.getByText('Por favor, insira um e-mail válido.')).toBeVisible();
    await page.getByPlaceholder('Email').fill('marcostaron@gmail');
    await expect(page.getByText('Por favor, insira um e-mail válido.')).toBeVisible();
    await page.getByPlaceholder('Email').fill('marcostaron@gmail.com');
    await expect(page.getByText('Por favor, insira um e-mail válido.')).not.toBeVisible;
  });

  test('should show cpf input validation error messages', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('CPF inválido.')).toBeVisible();
    await page.getByPlaceholder('CPF').fill('4402');
    await expect(page.getByText('CPF inválido.')).toBeVisible();
    await page.getByPlaceholder('CPF').fill('4402290');
    await expect(page.getByText('CPF inválido.')).toBeVisible();
    await page.getByPlaceholder('CPF').fill('44022903090');
    await expect(page.getByText('CPF inválido.')).not.toBeVisible();
  });

  test('should apply CPF mask', async ({ page }) => {
    await page.getByPlaceholder('CPF').fill('4402');
    await expect(page.getByPlaceholder('CPF')).toHaveValue('440.2');
    await page.getByPlaceholder('CPF').fill('4402290');
    await expect(page.getByPlaceholder('CPF')).toHaveValue('440.229.0');
    await page.getByPlaceholder('CPF').fill('44022903090');
    await expect(page.getByPlaceholder('CPF')).toHaveValue('440.229.030-90');
  });
});

test.describe('Submit form scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/new-job-application');
    await fillFormWithCorrectValues(page);
  });

  test('should create the new job application and be redirected to the dashboard', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('Nova candidatura criada com sucesso')).toBeVisible();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should show error message when the creation fails', async ({ page }) => {
    await page.route('**/job-applications', (route) => route.abort());
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await expect(page.getByText('Erro ao salvar candidatura')).toBeVisible();
    await expect(page).toHaveURL(/.*\/new-job-application/);
  });
});
