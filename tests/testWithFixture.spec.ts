import { test, OwnerData } from "../setUpNewOwner";
import { expect } from "@playwright/test";

test.describe("Fixture", async () => {
  test("test with fixture", async ({page, createNewOwner, pageManager}) => {
    const newOwnerDataFromFixture: OwnerData = createNewOwner;
    
    await pageManager.getNavigationPage().openOwnersPage();
    await pageManager.getOwnersPage().selectOwnerByNameAndOpenInformationPage(newOwnerDataFromFixture.randomFirstName + " " + newOwnerDataFromFixture.randomLastName);

    await pageManager.getOwnerInformationPage().validateOwnerInformationHeader();

    const petInformation = await page.locator("table.table-striped").filter({ hasText: newOwnerDataFromFixture.randomPetName });
    await petInformation.getByRole("button", { name: "Delete Visit" }).click();
    await expect(petInformation.getByRole("button", { name: "Delete Visit" })).not.toBeVisible();

    await petInformation.getByRole("button", { name: "Delete Pet" }).click();
    await expect(petInformation.getByRole("button", { name: "Delete Pet" })).not.toBeVisible();
  });
});
