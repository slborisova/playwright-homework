import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pM = new PageManager(page);
  await pM.getNavigationPage().openVeterinariansPage();
});

test.describe("Check Boxes", async () => {
  test("Validate selected specialties", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getVeterinariansPage().editVeterinarian("Helen Leary");
    
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("radiology");
        
    await  pM.getEditVeterinarianPage().openDropDownMenu(); 

    await  pM.getEditVeterinarianPage().validateDropDownSpecialtyIsCheckedFor("radiology"); 
    
    await pM.getEditVeterinarianPage().validateDropDownSpecialtyIsNotCheckedFor("surgery");
    await pM.getEditVeterinarianPage().validateDropDownSpecialtyIsNotCheckedFor("dentistry");
        
    await pM.getEditVeterinarianPage().checkDropDownSpecialty("surgery");
    await pM.getEditVeterinarianPage().uncheckDropDownSpecialty("radiology");
        
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("surgery");
    
    await pM.getEditVeterinarianPage().checkDropDownSpecialty("dentistry");
        
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("surgery, dentistry");
  });

  test("Select all specialties", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getVeterinariansPage().editVeterinarian("Rafael Ortega");
        
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("surgery");
    
    await pM.getEditVeterinarianPage().openDropDownMenu();
     
    await pM.getEditVeterinarianPage().selectAllBoxes();
     
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("surgery, radiology, dentistry, New specialty");
  });

  test("Unselect all specialties", async ({ page }) => {
    const pM = new PageManager(page);
    await pM.getVeterinariansPage().editVeterinarian("Linda Douglas");
    
    await pM.getEditVeterinarianPage().validateSelectedSpecialty("dentistry, surgery");
    
    await pM.getEditVeterinarianPage().openDropDownMenu();
    
    await pM.getEditVeterinarianPage().unselectAllBoxes();
    
    await pM.getEditVeterinarianPage().validateUnSelectedSpecialty();
  });
});
