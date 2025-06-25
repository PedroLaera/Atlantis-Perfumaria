import { test, expect } from "@playwright/test";

const NOME_USUARIO = "ivan vanco34";
const EMAIL_USUARIO = "ivanvanc34@hotmail.com";
const SENHA_USUARIO = "12345678@";
const CPF_USUARIO = "810.908.350-19";

test.describe.serial("CRUD de Usuário", () => {

  test("deve registrar um novo usuário com sucesso", async ({ page }) => {
    await page.goto("https://localhost/register");

    await page.locator('input[name="name"]').fill(NOME_USUARIO);
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.locator('input[name="CPF"]').fill(CPF_USUARIO);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL("https://localhost/login");
  });

  test("deve fazer login com sucesso", async ({ page }) => {
    await page.goto("https://localhost/login");

    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();

    await expect(page).toHaveURL("https://localhost/profile");
  });

  test("deve editar o nome do usuário no perfil", async ({ page }) => {

    await page.goto("https://localhost/login");

    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();

    await expect(page).toHaveURL("https://localhost/profile");

    await page.goto("https://localhost/profile");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: /Editar/i }).click();
    await page.locator('input[name="name"]').fill("ivan, o professor");
    await page.getByRole("button", { name: /Salvar Alterações/i }).click();
  });


  test("deve apagar a conta", async ({
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

test.describe.serial("CRUD de Usuário com falha", () => {
    test("deve registrar um novo usuário com falha", async ({ page }) => {
      await page.goto("https://localhost/register");
  
      await page.locator('input[name="name"]').fill("pedro Laera");
      await page.locator('input[name="email"]').fill("pedroLaele@hotmail.com");
      await page.locator('input[name="password"]').fill("12345678@");
      await page.locator('input[name="CPF"]').fill("07999629960");
      await page.locator('button[type="submit"]').click();

      await page.waitForTimeout(3000);

      const errorMessage = page.locator('text=Informação já utilizada por outro usuário.');
      await expect(errorMessage).toBeVisible();
    });

    test("deve tentar logar um  usuário com falha", async ({ page }) => {
      await page.goto("https://localhost/login");

      await page.locator('input[name="email"]').fill("taerradoissoaquimeu@gmail.com");
      await page.locator('input[name="password"]').fill("kkkkkkkkkkkkk");
      await page.getByRole("button", { name: /entrar/i }).click();
  
      await page.waitForTimeout(3000);

      const errorMessage = page.locator('text=Usuário não encontrado');
      await expect(errorMessage).toBeVisible();

    });
test("deve editar um  usuário com falha", async ({ page }) => {
    await page.goto("https://localhost/login");

            await page.locator('input[name="email"]').fill("pedroLaele@hotmail.com");
            await page.locator('input[name="password"]').fill("12345678@");
            await page.getByRole("button", { name: /entrar/i }).click();
        
            await expect(page).toHaveURL("https://localhost/profile");
        
            await page.goto("https://localhost/profile");
            await page.waitForTimeout(3000);
            await page.getByRole("button", { name: /Editar/i }).click();
            await page.locator('input[name="name"]').fill("");
            await page.getByRole("button", { name: /Salvar Alterações/i }).click();

            const errorMessage = page.getByText('O nome deve ter pelo menos 3 caracteres.');

            await expect(errorMessage).toBeVisible();
    });
});



