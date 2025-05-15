import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openPetTypesPage();
});

test.describe("Dialog Boxes", async () => {
  test("Add and delete pet type", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getPetTypesPage().clickAddNewPetButtonAndValidatePetNameIsVisible();
        
    await pM.getPetTypesPage().fillNewPetType("pig");
    
    await pM.getPetTypesPage().verifyNewPetTypeAdded("pig");
       
    await pM.getPetTypesPage().deleteLastPetType();
       
    await pM.getPetTypesPage().validateDeletedPetType("pig");
  });
});
