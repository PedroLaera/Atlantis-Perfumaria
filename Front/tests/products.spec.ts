import { test, expect } from "@playwright/test";

// --- Dados do Usuário em Constantes ---
//const NOME_USUARIO = 'Pedro Laera';
const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";
//const CPF_USUARIO = '275.538.590-10';

test("Crud Produto", async ({ page }) => {
  await page.goto("http://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();

  await expect(page).toHaveURL("http://localhost/profile");

  await page.getByRole("link", { name: /Adicionar Produto/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  await expect(page).toHaveURL("http://localhost/addproduct");

  await page.getByRole("link", { name: /Adicionar Nova Categoria/i }).click();

  await page.locator('input[name="name"]').fill("test");

  await page.getByRole("button", { name: /Cadastrar/i }).click();


  await page.getByRole("button", { name: /Categorias/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  const todasAsLinhas = page.getByRole('row');

  const linhaEspecifica = todasAsLinhas.filter({hasText: test })

  await page.getByRole("link", { name: /editar/i }).click();

  await page.locator('input[name="name"]').fill("test edited");

  await page.getByRole("button", { name: /Salvar Alterações/i }).click();
});
