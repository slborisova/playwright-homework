import { test, expect } from "@playwright/test";
import { escape } from "querystring";
import { PageManager } from "../page-objects/pageManager";

test.describe("Web Tables-Owners", async () => {
  test.beforeEach(async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getNavigationPage().openOwnersPage();
  });

  test("Validate the pet name city of the owner", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().validatePetAndCityNamesOfOwner("Jeff Black", "Monona", "Lucky");
  });

  test("Validate owners count of the Madison city", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().validateAmountOfCities("Madison", 4);
  });

  test("Validate search by Last Name", async ({ page }) => {
    const pM = new PageManager(page);
    const ownerLastNames = ["Black", "Davis", "Es", "Playwright"];

    for (let ownerLastName of ownerLastNames) {
      await pM.getOwnersPage().setOwnerLastNameSearch(ownerLastName);
      await pM.getOwnersPage().validateSelectedLastName(ownerLastName);
    }
  });

  test("Validate phone number and pet name on the Owner Information page", async ({page }) => {
    const pM = new PageManager(page);
    const ownerPhoneNumber = "6085552765";

    let petName = await pM.getOwnersPage().getPetNameByPhoneNumber(ownerPhoneNumber);
    
    await pM.getOwnersPage().openInformationOwnerPageByPhoneNumber(ownerPhoneNumber);

    await pM.getOwnerInformationPage().validateOwnerInformationHeader();
    await pM.getOwnerInformationPage().validatePhoneNumberAndPetName(ownerPhoneNumber, petName);
  });

  test("Validate pets of the Madison city", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().countSelectedCityPetRows("Madison", 4);

    await pM.getOwnersPage().validatePetNameForCity("Madison");
  });
});

test.describe("Web Tables-Veterinarians", async () => {
  test.beforeEach(async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getNavigationPage().openVeterinariansPage();
  });

  test("Validate specialty update", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getVeterinariansPage().validateVeterinarianSpecialty("Rafael Ortega", "surgery");
    
    await pM.getNavigationPage().openSpecialtiesPage();
    
    await pM.getSpecialtiesPage().editSpecialty("surgery");
    
    await pM.getEditSpecialtyPage().validateEditSpecialtyHeader();
    
    await pM.getEditSpecialtyPage().updateSpecialtyName("dermatology");
    
    await pM.getNavigationPage().openSpecialtiesPage(); 
    await pM.getSpecialtiesPage().validateUpdatedSpecialtyName("dermatology");
    
    await pM.getNavigationPage().openVeterinariansPage();
    
    await pM.getVeterinariansPage().validateVeterinarianSpecialty("Rafael Ortega", "dermatology");
    await pM.getNavigationPage().openSpecialtiesPage(); 
    
    await pM.getSpecialtiesPage().editSpecialty("dermatology");
    
    await pM.getEditSpecialtyPage().validateEditSpecialtyHeader();
    
    await pM.getEditSpecialtyPage().updateSpecialtyName("surgery");
  });
});

test.describe("Web Tables-Specialties", async () => {
  test.beforeEach(async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getNavigationPage().openSpecialtiesPage();
  });

  test("Validate specialty lists", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getSpecialtiesPage().addNewSpecialty("oncology");
        
    const specialties = await pM.getSpecialtiesPage().getAllSpecialties();
    
    await pM.getNavigationPage().openVeterinariansPage();
    
    await pM.getVeterinariansPage().editVeterinarian("Sharon Jenkins");
       
    await pM.getEditVeterinarianPage().validateSpecialtiesList(specialties);
    
    await pM.getEditVeterinarianPage().changeVeterinarianSpecialty("oncology");
       
    await pM.getVeterinariansPage().validateChangedVeterinarianSpecialty("Sharon Jenkins", "oncology");
    
    await pM.getNavigationPage().openSpecialtiesPage();
        
    await pM.getSpecialtiesPage().deleteLastSpecialty();
    
    await pM.getNavigationPage().openVeterinariansPage();
   
    await pM.getVeterinariansPage().validateVeterinarianEmptySpecialty("Sharon Jenkins");
  });
});
