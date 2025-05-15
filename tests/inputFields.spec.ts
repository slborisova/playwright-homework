import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openPetTypesPage();
});

test.describe("Interacting with Input Fields", async () => {
  test("Update pet type", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getPetTypesPage().clickEdiButtonForTheFirstPetType();
    
    await pM.getEditPetTypePage().validateEditPetTypeHeader();
    
    await pM.getEditPetTypePage().fillPetTypeBox("rabbit");
    
    await pM.getEditPetTypePage().updatePetType();
    
    await pM.getPetTypesPage().validatePetTypeByIndex(0, "rabbit");
    
    await pM.getPetTypesPage().clickEdiButtonForTheFirstPetType();
    
    await pM.getEditPetTypePage().fillPetTypeBox("cat");
        
    await pM.getEditPetTypePage().updatePetType();
    
    await pM.getPetTypesPage().validatePetTypeByIndex(0, "cat");
  });

  test("Cancel pet type update", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getPetTypesPage().editPetTypeByIndex(1);
    
    await pM.getEditPetTypePage().validateEditPetTypeHeader();
   
    await pM.getEditPetTypePage().fillPetTypeBox("moose");
   
    await pM.getEditPetTypePage().validatePetType("moose");
    
    await pM.getEditPetTypePage().cancelPetType();
   
    await pM.getPetTypesPage().validatePetTypeByIndex(1, "dog");
  });

  test("Pet type name is required validation", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getPetTypesPage().editPetTypeByIndex(2);
   
    await pM.getEditPetTypePage().clearPetTypeField();
        
    await pM.getEditPetTypePage().nameRequiredMessage();
   
    await pM.getEditPetTypePage().updatePetType();
    
    await pM.getEditPetTypePage().validateEditPetTypeHeader();
    
    await pM.getEditPetTypePage().cancelPetType();
   
    await pM.getPetTypesPage().validatePetTypesHeader();
  });
});
