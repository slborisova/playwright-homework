import { test, expect } from '@playwright/test';
import { PageManager } from "../page-objects/pageManager";

test.beforeEach( async({page}) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openHomePage();
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  const pM = new PageManager(page);
  await pM.getHomePage().validateHomePageTitle();
    
  await pM.getNavigationPage().openVeterinariansPage();
  
  await pM.getVeterinariansPage().editVeterinarian("Linda Douglas");
  
  await pM.getEditVeterinarianPage().selectSpecialty("radiology");
});