import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('@smoke login', () => {
  test('successful login navigates to inventory', async ({ page }) => {
    const username = process.env.E2E_USERNAME ?? 'standard_user';
    const password = process.env.E2E_PASSWORD ?? 'secret_sauce';

    const login = new LoginPage(page);

    await login.goto();
    await login.login(username, password);

    // SauceDemo redirects to /inventory.html on success
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('invalid password shows an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'wrong_password');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      /Username and password do not match/i
    );
  });
});