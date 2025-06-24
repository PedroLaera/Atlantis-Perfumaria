import { test, expect } from "@playwright/test";

// --- Dados do Usuário em Constantes ---
//const NOME_USUARIO = 'Pedro Laera';
const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";
//const CPF_USUARIO = '275.538.590-10';


test.describe.serial("CRUD de Categoria", () => {

test("Criar categoria", async ({ page }) => {
  await page.goto("https://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();

  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Adicionar Categoria/i }).click();

  await expect(page).toHaveURL("https://localhost/createCategory");

  await page.locator('input[name="name"]').fill("test");

  await page.getByRole("button", { name: /Cadastrar/i }).click();
});

  test("deve editar a categoria ", async ({
    page,
  }) => {
    await page.goto("https://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();

  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Visualizar/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  await page.locator('a[href="/editCategory/2"]').click();

  await page.locator('input[name="name"]').fill("test edited");

  await page.getByRole("button", { name: /Salvar Alterações/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();
  });

  test("deve excluir a categoria ", async ({
    page,
  }) => {
    await page.goto("https://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();
  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Visualizar/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  await page.locator('#3').click();
  });
});

test.describe.serial("CRUD de Categoria erros", () => {

  test("Criar categoria erro", async ({ page }) => {
      await page.goto("https://localhost/login");
    
      await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
      await page.locator('input[name="password"]').fill(SENHA_USUARIO);
      await page.getByRole("button", { name: /entrar/i }).click();
    
      await expect(page).toHaveURL("https://localhost/profile");
    
      await page.getByRole("link", { name: /Adicionar Categoria/i }).click();
    
      await expect(page).toHaveURL("https://localhost/createCategory");
    
      await page.locator('input[name="name"]').fill("");
    
      await page.getByRole("button", { name: /Cadastrar/i }).click();

      const errorAlert = page.getByTestId('error-message');

      await expect(errorAlert).toBeVisible();

      await expect(errorAlert).toHaveText('Preencha o nome da categoria!');

  });
});