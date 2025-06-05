import { test, expect } from '@playwright/test';


test('Login user', async ({ page }) => {
  await page.goto('localhost/login');

    // Fill input email.
    await page.locator('input[name="email"]').fill('pedroHlaera@hotmail.com');

    // Fill input password.
    await page.locator('input[name="password"]').fill('12345678@');

    // Click the register button.
    await page.locator('button[type="submit"]').click();

});

