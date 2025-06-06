import { test, expect } from '@playwright/test';

test('Creat user', async ({ page }) => {
  await page.goto('localhost/register');

  // Fill input name.
  await page.locator('input[name="name"]').fill('ivan vanco'); 
  
  // Fill input email.
  await page.locator('input[name="email"]').fill('ivanvanco@hotmail.com');
 
  // Fill input password.
  await page.locator('input[name="password"]').fill('12345678@');
  
  // fill input CPF
  await page.locator('input[name="CPF"]').fill('736.704.560-15');
  
  // Click the register button.
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL('localhost/login'); 
});


