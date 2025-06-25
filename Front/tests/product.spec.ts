import { test, expect } from "@playwright/test";

const EMAIL_USUARIO = "pedroLaele@hotmail.com";
const SENHA_USUARIO = "12345678@";

test.describe.serial("CRUD de Produto", () => {  
test("criando produto", async ({ page }) => {
  await page.goto("https://localhost/login");
  await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
  await page.locator('input[name="password"]').fill(SENHA_USUARIO);
  await page.getByRole("button", { name: /entrar/i }).click();
  await expect(page).toHaveURL("https://localhost/profile");

  await page.getByRole("link", { name: /Criar Produto/i }).click();

  await expect(page).toHaveURL("https://localhost/createProduct");

  await page.waitForTimeout(3000);

  await page.locator('input[name="name"]').fill("Test Novo Produto");

  await page.locator('input[name="description"]').fill("cheiro teste");

  await page.locator('input[name="price"]').fill("129.99");

  await page.locator('input[name="stock"]').fill("10");

  await page.locator('[id="12"]').selectOption({ index: 2 }); 

  //await page.selectOption('#select-product-category', { index: 5 });

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

        await page.locator('a[href="/editProduct/6"]').click();

        await page.locator('input[name="name"]').fill("Test Novo Produto editedo");

        await page.locator('input[name="description"]').fill("cheiro teste");

        await page.locator('input[name="price"]').fill("309.99");

        await page.locator('input[name="stock"]').fill("20");

        await page.locator('[id="10"]').selectOption({ index: 2 });

        //await page.selectOption('#select-edit-product-category', { index: 2 });
        
        page.on('dialog', async dialog => {

            expect(dialog.type()).toBe('alert');
      
            expect(dialog.message()).toBe('Produto atualizado com sucesso!');
      
            await dialog.accept();
          });
      
        await page.getByRole("button", { name: /Salvar Alterações/i }).click();

        await expect(page).toHaveURL("https://localhost/addproduct");
    }); 


    /*test("excluindo produto", async ({ page }) => {
        await page.goto("https://localhost/login");
        await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
        await page.locator('input[name="password"]').fill(SENHA_USUARIO);
        await page.getByRole("button", { name: /entrar/i }).click();
        await expect(page).toHaveURL("https://localhost/profile");    

        await page.getByRole("link", { name: /Visualizar/i }).click();

        await page.locator('#1').click();
    });*/
});

test.describe.serial("CRUD de produto com falha", () => {

    test("deve registrar um novo produto com falha", async ({ page }) => {
        await page.goto("https://localhost/login");
        await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
        await page.locator('input[name="password"]').fill(SENHA_USUARIO);
        await page.getByRole("button", { name: /entrar/i }).click();
        await expect(page).toHaveURL("https://localhost/profile");

        await page.getByRole("link", { name: /Criar Produto/i }).click();

        await expect(page).toHaveURL("https://localhost/createProduct");
      
        await page.locator('input[name="name"]').fill("Test Novo Produto");
      
        await page.locator('input[name="description"]').fill("cheiro teste");
      
        await page.locator('input[name="price"]').fill("129.99");
      
        await page.locator('input[name="stock"]').fill("10");
      
        await page.locator('[id="12"]').selectOption({ index: 2 });

        //await page.selectOption('#select-product-category', { index: 1 });

        page.on('dialog', async dialog => {

            expect(dialog.type()).toBe('alert');
      
            expect(dialog.message()).toBe('Preencha todos os campos obrigatórios!');
      
            await dialog.accept();
          });
      
        await page.getByRole("button", { name: /Criar Produto/i }).click();
      
        await expect(page).toHaveURL("https://localhost/createProduct");
        });

    test("deve editar um produto com falha", async ({ page }) => {
        await page.goto("https://localhost/login");
        await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
        await page.locator('input[name="password"]').fill(SENHA_USUARIO);
        await page.getByRole("button", { name: /entrar/i }).click();
        await expect(page).toHaveURL("https://localhost/profile");
      
        await page.getByRole("link", { name: /Visualizar/i }).click();

        await page.locator('a[href="/editProduct/6"]').click();

        await page.locator('input[name="name"]').fill("Test Novo Produto editedo");

        await page.locator('input[name="description"]').fill("");

        await page.locator('input[name="price"]').fill("309.99");

        await page.locator('input[name="stock"]').fill("20");

        await page.locator('[id="10"]').selectOption({ index: 2 });
        

        page.on('dialog', async dialog => {

            expect(dialog.type()).toBe('alert');
      
            expect(dialog.message()).toBe('Preencha todos os campos corretamente!');
      
            await dialog.accept();
          });
      
        await page.getByRole("button", { name: /Salvar Alterações/i }).click();

        await expect(page).toHaveURL("https://localhost/editProduct/6");
        });
    });
