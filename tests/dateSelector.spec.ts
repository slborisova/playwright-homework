import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { CurrentDateHelper } from "../page-objects/currentDateHelper";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openOwnersPage();
});

test.describe("Date Selector", async () => {
  test("Select the desired date in the calendar", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("Harold Davis");

    await pM.getOwnerInformationPage().clickAddNewPetButton();
    
    await pM.getOwnerAddPetPage().fillInPetNameAndCheckIconBehavior();
    
    await pM.getOwnerAddPetPage().fillInBirthDateAndCheckDate();
    
    await pM.getOwnerAddPetPage().selectTypeOfPet("dog");
    
    await pM.getOwnerAddPetPage().savePet();
    
    await pM.getOwnerInformationPage().validateCreatedPet("Tom", "2014-05-02", "dog");
    await pM.getOwnerInformationPage().deleteLastPet();
    await pM.getOwnerInformationPage().validateLastPetIsDeleted();
  });

  test("Select the dates of visits and validate dates order", async ({page}) => {
    const currentDate = new CurrentDateHelper();
    
    const pM = new PageManager(page);
    await pM.getOwnersPage().selectOwnerByNameAndOpenInformationPage("Jean Coleman");
    
    await pM.getOwnerInformationPage().clickAddVisitButtonForNewVisit();
    
    await pM.getPetAddVisitPage().validateNewVisitPageOpened();
    await pM.getPetAddVisitPage().validatePetNameAndOwnerName("Samantha", "Jean Coleman");
    await pM.getPetAddVisitPage().fillInAndValidateVisitDate(currentDate.getCurrentYear(), currentDate.getCurrentMonth(), currentDate.getCurrentDay());
    await pM.getPetAddVisitPage().fillInDescriptionInputField("dermatologist visit");
    await pM.getPetAddVisitPage().clickAddVisitButton();
    
    const dermatologistVisitDate = `${currentDate.getCurrentYear()}-${currentDate.getCurrentMonth()}-${currentDate.getCurrentDay()}`;
    await pM.getOwnerInformationPage().validateCreatedVisitDate(dermatologistVisitDate);
    
    await pM.getOwnerInformationPage().clickAddVisitButtonForNewVisit();
    await pM.getPetAddVisitPage().fillInLastVisitDateAndValidate(currentDate.getSelectedDate());
   
    await pM.getPetAddVisitPage().fillInDescriptionInputField("massage therapy");
    await pM.getPetAddVisitPage().clickAddVisitButton();
    
    await pM.getOwnerInformationPage().firstTwoVisitDatesComparison();
   
    await pM.getOwnerInformationPage().deleteVisitAndVerifyItDeleted("dermatologist visit");
    await pM.getOwnerInformationPage().deleteVisitAndVerifyItDeleted("massage therapy");
  });
});
