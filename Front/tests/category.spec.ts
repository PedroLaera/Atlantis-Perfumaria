import { test, expect } from "@playwright/test";

const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";


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

  await page.locator('a[href="/editCategory/4"]').click();

  await page.locator('input[name="name"]').fill("test edited");

  await page.getByRole("button", { name: /Salvar Alterações/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();
  });

  /*test("deve excluir a categoria ", async ({
    page,
  }) => {
    await page.goto("https://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();
  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Visualizar/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  await page.locator('#4').click();
  });*/
});

test.describe.serial("CRUD de Categoria falha", () => {

  test("Criar categoria falha", async ({ page }) => {
      await page.goto("https://localhost/login");
    
      await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
      await page.locator('input[name="password"]').fill(SENHA_USUARIO);
      await page.getByRole("button", { name: /entrar/i }).click();
    
      await expect(page).toHaveURL("https://localhost/profile");
    
      await page.getByRole("link", { name: /Adicionar Categoria/i }).click();
    
      await expect(page).toHaveURL("https://localhost/createCategory");
    
      await page.locator('input[name="name"]').fill("");
    
      //  Início da lógica para o alert 

    page.on('dialog', async dialog => {

      expect(dialog.type()).toBe('alert');

      expect(dialog.message()).toBe('Preencha o nome da categoria!');

      await dialog.accept();
    });

    await page.getByRole("button", { name: /Cadastrar/i }).click();

    await expect(page).toHaveURL("https://localhost/createCategory");
  });

  test("editar categoria com falha", async ({ page }) => {
    await page.goto("https://localhost/login");

  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();

  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Visualizar/i }).click();

  await page.getByRole("button", { name: /Categorias/i }).click();

  await page.locator('a[href="/editCategory/4"]').click();

  await page.locator('input[name="name"]').fill("");

    //  Início da lógica para o alert 

    page.on('dialog', async dialog => {

      expect(dialog.type()).toBe('alert');

      expect(dialog.message()).toBe('Digite um nome de categoria válido!');

      await dialog.accept();
    });

  await page.getByRole("button", { name: /Salvar Alterações/i }).click();

  await expect(page).toHaveURL("https://localhost/editCategory/4");
  });
});