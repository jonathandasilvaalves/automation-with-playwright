import { Page } from '@playwright/test';

export async function selectRadioOrCheckbox(page:Page, options:Array<string>) {

    const option = options[Math.floor(Math.random() * options.length)];
    await page.click(option)
}