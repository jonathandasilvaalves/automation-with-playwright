import { expect, test } from "@playwright/test";

test.describe('Testing Home page', async ()=> { 
    test.beforeEach(async ({ page })=> {
        await page.goto("https://demo.automationtesting.in/")
    });

    test('Entering real email on the login home page', async ({ page }) => {
        await page.locator('#email').fill('teste@teste.com.br');
        await page.locator('#enterimg').click();

        await expect(page.locator('h1')).toHaveText([
            'Automation Demo Site'
        ])
        await expect(page).toHaveURL(/.*Register/);
    });
});