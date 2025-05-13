import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openOwnersPage();
});

test.describe("Lists and Drop Downs", async () => {
  test("Validate selected pet types from the list", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("George Franklin");
    
    await pM.getOwnerInformationPage().validateOwnerFullName("George Franklin")
    await pM.getOwnerInformationPage().editPet("Leo");
 
    await pM.getPetEditPage().checkPetHeaderExists();
    await pM.getPetEditPage().validateOwnerName("George Franklin");
    await pM.getPetEditPage().validatePetType("cat");
    await pM.getPetEditPage().validateTypesList();
    await pM.getPetEditPage().selectAndValidateSelectedType();
  });

  test("Validate the pet type update", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("Eduardo Rodriquez");

    await pM.getOwnerInformationPage().editPet("Rosy");
   
    await pM.getPetEditPage().checkPetHeaderExists();
    await pM.getPetEditPage().validatePetType("dog");
    
    await pM.getPetEditPage().selectPetType("lizard");
    
    await pM.getPetEditPage().updatePet();
    
    await pM.getOwnerInformationPage().validatePetType("lizard");
        
    await pM.getOwnerInformationPage().editPet("Rosy");
   
    await pM.getPetEditPage().checkPetHeaderExists();
    await pM.getPetEditPage().validatePetType("lizard");
   
    await pM.getPetEditPage().selectPetType("dog");
    
    await pM.getPetEditPage().updatePet();
    
    await pM.getOwnerInformationPage().validatePetType("dog");
  });
});
