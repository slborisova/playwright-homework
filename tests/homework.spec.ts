import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
  await page.getByRole('button', { name: 'Veterinarians' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('row', { name: 'Linda Douglas' }).getByRole('button', {name: 'Edit Vet'}).click();
  await page.locator('.dropdown-display').click();
  await page.getByRole('checkbox', {name: 'radiology'}).check()
});