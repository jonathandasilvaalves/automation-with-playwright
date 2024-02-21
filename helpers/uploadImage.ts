import { Page } from '@playwright/test';

export async function uploadImage(page:Page, filePath:string) {
    await page.waitForSelector('input#imagesrc');
    await page.setInputFiles('input#imagesrc', [filePath]);
}