import { test, expect } from '@playwright/test';


test('Crud usuário', async ({ page }) => {
  await page.goto('localhost/register');

  // Fill input name.
  await page.locator('input[name="name"]').fill('ivan vanco'); 
  
  // Fill input email.
  await page.locator('input[name="email"]').fill('ivanvanco2@hotmail.com');
 
  // Fill input password.
  await page.locator('input[name="password"]').fill('12345678@');
  
  // fill input CPF
  await page.locator('input[name="CPF"]').fill('879.862.080-07');
  
  // Click the register button.
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL('localhost/login'); 

  await page.goto('localhost/login'); 

  await page.locator('input[name="email"]').fill('ivanvanco2@hotmail.com');
  await page.locator('input[name="password"]').fill('12345678@');

  await page.getByRole('button', { name: /entrar/i }).click(); 

  await expect(page).toHaveURL('localhost/profile'); 

  await page.goto('localhost/profile');

  await page.locator('button[name="Apagar Conta"]').click();
});
