import { test, expect } from "@playwright/test";

// --- Dados do Usuário em Constantes ---
const NOME_USUARIO = "ivan vanco1";
const EMAIL_USUARIO = "ivanvanco1@hotmail.com";
const SENHA_USUARIO = "12345678@";
const CPF_USUARIO = "204.100.840-77";

test.describe.serial("CRUD de Usuário", () => {
  // Teste 1: Focado apenas no registro
  // Este teste irá rodar primeiro, criando o usuário.
  test("deve registrar um novo usuário com sucesso", async ({ page }) => {
    await page.goto("https://localhost/register");

    await page.locator('input[name="name"]').fill(NOME_USUARIO);
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.locator('input[name="CPF"]').fill(CPF_USUARIO);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL("https://localhost/login");
  });

  // Teste 2: Focado apenas no login
  // Este teste rodará em segundo, agora com a garantia de que o usuário existe.
  test("deve fazer login com sucesso", async ({ page }) => {
    await page.goto("https://localhost/login");

    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();

    // Esta verificação agora deve passar.
    await expect(page).toHaveURL("https://localhost/profile");
  });

  // Teste 3: Focado apenas na exclusão (com seu próprio setup de login)
  test("deve apagar a conta após confirmação e alerta de sucesso", async ({
    page,
  }) => {
    await page.goto("https://localhost/login");

    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();

    await expect(page).toHaveURL("https://localhost/profile");

    await page.goto("https://localhost/profile");
    await page.waitForTimeout(3000);
    page.getByTestId("botao-Excluir-Perfil").click();

    await expect(page).toHaveURL("https://localhost/login");
    await page.goto("https://localhost/login");
    await page.waitForTimeout(3000);
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();
  });
});
