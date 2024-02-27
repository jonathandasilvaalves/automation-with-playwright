import { expect, test } from "@playwright/test";

test.describe("Testing page SwitchTo", async ()=> {
    test.beforeEach(async ({ page })=> {
        await page.goto("https://demo.automationtesting.in/Alerts.html")
    });

    test("Testing alert Ok", async({ page  })=> {

        page.on('dialog', async dialog=> {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('I am an alert box!')
            await dialog.accept();
        });

        await page.click('button[onclick="alertbox()"]');
    });

    test("Alert (confirm) with click on cancel button", async ({ page })=>{

        await page.click('a[href="#CancelTab"]');

        page.on('dialog', async dialog=> {
            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Press a Button !')
            await dialog.dismiss();
        });

        await page.click('button.btn-primary');

        expect(page.locator('#demo')).toHaveText('You Pressed Cancel');
    });
});