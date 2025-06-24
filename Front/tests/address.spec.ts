import { test, expect } from "@playwright/test";

//const NOME_USUARIO = 'Pedro Laera';
const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";

test.describe.serial("CRUD de endereço", () => {
    // Este teste irá rodar primeiro, criando o usuário.    
test("criando endereço", async ({ page }) => {
    await page.goto("https://localhost/login");
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole("button", { name: /entrar/i }).click();
    await expect(page).toHaveURL("https://localhost/profile");

    await page.getByRole("button", { name: /Cadastrar Endereço/i }).click();

    await page.locator('input[name="number"]').fill("123");

    await page.locator('input[name="complement"]').fill("casa");
  
    await page.locator('input[name="neighborhood"]').fill("jardim teste");
  
    await page.locator('input[name="city"]').fill("Campo Mourão");
    
    await page.locator('input[name="state"]').fill("Paraná");

    await page.locator('input[name="zipCode"]').fill("87301178");

    await page.getByRole("button", { name: /Salvar Endereço/i }).click();
    });
});