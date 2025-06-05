import { test, expect } from '@playwright/test';

test('Creat user', async ({ page }) => {
  await page.goto('localhost/register');

  // Fill input name.
  await page.locator('input[name="name"]').fill('Pedro Laera'); 
  
  // Fill input email.
  await page.locator('input[name="email"]').fill('pedroHlaera@hotmail.com');
 
  // Fill input password.
  await page.locator('input[name="password"]').fill('12345678@');
  
  // fill input CPF
  await page.locator('input[name="CPF"]').fill('733.474.500-00');
  
  // Click the register button.
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL('localhost/login'); 
});


