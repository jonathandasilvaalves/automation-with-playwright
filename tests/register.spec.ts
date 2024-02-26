import { expect, test } from "@playwright/test";
import { uploadImage } from '../helpers/uploadImage';
import { RegisterUser } from '../commands/Register';

import { faker } from '@faker-js/faker';

test.describe('Validations page Register', async() => {
    test.beforeEach(async ({ page })=> {
        await page.goto("https://demo.automationtesting.in/Register.html");
    });

    const dataRegister = {
        'FirstName': faker.person.firstName(),
        'LastName': faker.person.lastName(),
        'Address': faker.lorem.sentence(),
        'Email': faker.internet.email(),
        'Phone': '4399955542'
    }
    
    test('Testing success register', async ({ page }) => {
        test.fail();

        await uploadImage(page, '../images/Image01.jpeg');
        await RegisterUser(page, dataRegister);
        await expect(page.locator('h1')).toHaveText('Usuário registrado!');
    });

    test('Validating register without e-mail', async ({ page }) => {
        const dataRegisterWithoutEmail = dataRegister;
        dataRegisterWithoutEmail.Email = '';
        await RegisterUser(page, dataRegisterWithoutEmail);
        expect(page.locator('input[ng-model="Phone"][required]')).toBeVisible();
    });
});