import { Page } from '@playwright/test';

import { selectRadioOrCheckbox } from '../helpers/selectRadioOrCheckbox'; 

type DataRegister = {
    'FirstName': string;
    'LastName': string;
    'Address': string;
    'Email': string;
    'Phone': string;
  };

const optionsGender = [
    'input[value="Male"]',
    'input[value="FeMale"]'
]
const optionsHobbies = [
    '#checkbox1',
    '#checkbox2',
    '#checkbox3'
]

export async function RegisterUser(page:Page, data:DataRegister) {

    await page.getByPlaceholder('First Name').fill(data.FirstName);
    await page.getByPlaceholder('Last Name').fill(data.LastName);
    await page.locator('textarea[ng-model="Adress"]').fill(data.Address);
    await page.locator('input[ng-model="EmailAdress"]').fill(data.Email);
    await page.locator('input[type=tel]').fill(data.Phone);
    await selectRadioOrCheckbox(page, optionsGender);
    await selectRadioOrCheckbox(page, optionsHobbies);

    await page.waitForSelector('multi-select')
    await page.click('multi-select')
    await page.waitForSelector('multi-select ul');
    const options = await page.$$eval('multi-select ul li', (options) =>
    options.map((option) => option.textContent?.trim())
    );
    const opcaoAleatoria = options[Math.floor(Math.random() * options.length)];
    await page.click(`multi-select ul li:has-text("${opcaoAleatoria}")`);

    await page.waitForSelector('#Skills')
    await page.selectOption('#Skills', 'Backup Management')

    await page.locator('#firstpassword').fill('$124gR')
    await page.locator('#secondpassword').fill('$124gR')

    await page.click('#submitbtn');
}