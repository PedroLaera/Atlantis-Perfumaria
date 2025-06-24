import { test, expect } from "@playwright/test";

// --- Dados do Usuário em Constantes ---
//const NOME_USUARIO = 'Pedro Laera';
const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";
//const CPF_USUARIO = '275.538.590-10';

test.describe.serial("CRUD de Produto", () => {
    // Teste 1: Focado apenas no registro
    // Este teste irá rodar primeiro, criando o usuário.    
test("criando produto", async ({ page }) => {
  await page.goto("https://localhost/login");
  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();
  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Adicionar Produto/i }).click();

  await expect(page).toHaveURL("https://localhost/createProduct");

  await page.locator('input[name="name"]').fill("Test Novo Produto");

  await page.locator('input[name="description"]').fill("cheiro teste");

  await page.locator('input[name="price"]').fill("129.99");

  await page.locator('input[name="stock"]').fill("10");

  await page.locator('#select-product-category').selectOption('3');

  await expect(page.locator('#select-product-category')).toHaveValue('3');

  await page.getByRole("button", { name: /Criar Produto/i }).click();

  await expect(page).toHaveURL("https://localhost/addproduct");
    });
    test("editando produto", async ({ page }) => {
        await page.goto("https://localhost/login");
        await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
        await page.locator('input[name="password"]').fill(SENHA_USUARIO);
        await page.getByRole("button", { name: /entrar/i }).click();
        await expect(page).toHaveURL("https://localhost/profile");

        await page.getByRole("link", { name: /Visualizar/i }).click();

        await page.locator('a[href="/editProduct/7"]').click();

        await page.locator('input[name="name"]').fill("Test Novo Produto editedo");

        await page.locator('input[name="description"]').fill("cheiro teste");

        await page.locator('input[name="price"]').fill("309.99");

        await page.locator('input[name="stock"]').fill("20");

        await page.locator('#select-product-category').selectOption('3');

        await page.getByRole("button", { name: /Salvar Alterações/i }).click();
    }); 
    test("excluindo produto", async ({ page }) => {
        await page.goto("https://localhost/login");
        await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
        await page.locator('input[name="password"]').fill(SENHA_USUARIO);
        await page.getByRole("button", { name: /entrar/i }).click();
        await expect(page).toHaveURL("https://localhost/profile");    

        await page.getByRole("link", { name: /Visualizar/i }).click();

        await page.locator('#1').click();
    });
});