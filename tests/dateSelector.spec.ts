import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openOwnersPage();
});

test.describe("Date Selector", async () => {
  test("Select the desired date in the calendar", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("Harold Davis");

    await pM.getOwnerInformationPage().addNewPet();
    
    await pM.getOwnerAddPetPage().fillInPetNameAndCheckIconBehavior();
    
    await pM.getOwnerAddPetPage().fillInBirthDateAndCheckDate();
    
    await pM.getOwnerAddPetPage().selectTypeOfPet("dog");
    
    await pM.getOwnerAddPetPage().savePet();
    
    await pM.getOwnerInformationPage().validateCreatedPet("Tom", "2014-05-02", "dog");
    await pM.getOwnerInformationPage().deletePet();
    await pM.getOwnerInformationPage().validateDeletedPet();
  });

  test("Select the dates of visits and validate dates order", async ({page}) => {
    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.toLocaleString("en-US", { month: "2-digit" });
    const currentDay = date.getDate().toString().padStart(2, "0");

    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("Jean Coleman");
    
    await pM.getOwnerInformationPage().addNewVisit();
    
    await pM.getPetAddVisitPage().validateNewVisitPageOpened();
    await pM.getPetAddVisitPage().validatePetNameAndOwnerName("Samantha", "Jean Coleman");
    await pM.getPetAddVisitPage().fillInAndValidateVisitDate(currentYear, currentMonth, currentDay);
    await pM.getPetAddVisitPage().fillInDescriptionInputField("dermatologist visit");
    await pM.getPetAddVisitPage().addVisit();
    
    const dermatologistVisitDate = `${currentYear}-${currentMonth}-${currentDay}`;
    await pM.getOwnerInformationPage().validateCreatedVisitDate(dermatologistVisitDate);
    
    await pM.getOwnerInformationPage().addNewVisit();
    await pM.getPetAddVisitPage().fillInLastVisitDateAndValidate(date);
   
    await pM.getPetAddVisitPage().fillInDescriptionInputField("massage therapy");
    await pM.getPetAddVisitPage().addVisit();
    
    await pM.getOwnerInformationPage().firstTwoVisitDatesComparison();
   
    await pM.getOwnerInformationPage().deleteVisitAndVerifyItDeleted("dermatologist visit");
    await pM.getOwnerInformationPage().deleteVisitAndVerifyItDeleted("massage therapy");
  });
});
