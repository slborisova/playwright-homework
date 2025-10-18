import { test, expect } from '@playwright/test';
import { PageManager } from "../page-objects/pageManager";
const { faker } = require("@faker-js/faker");


test.only('visual testing', async({page}) => {

    await page.goto("/");
    await page.getByText("Owners").click();
    await page.getByText("ADD NEW").first().click();

    //await page.screenshot({path: 'screenshots/disabledButton.png'});
    await expect(page).toHaveScreenshot('screenshots/disabledButton.png', {maxDiffPixels:50, timeout: 20000});

    await page.locator("#firstName").fill("First name");
    await page.locator("#lastName").fill("Last name");
    await page.locator("#address").fill("Address");
    await page.locator("#city").fill("City");
    await page.locator("#telephone").fill("999999999");

    //await page.screenshot({path: 'screenshots/activeButton.png'});
    await expect(page).toHaveScreenshot('screenshots/activeButton.png', {maxDiffPixels:50, timeout: 20000});
})