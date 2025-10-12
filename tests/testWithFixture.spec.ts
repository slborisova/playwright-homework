import { test } from "../setUpNewOwner";
import { expect } from "@playwright/test";
const { faker } = require("@faker-js/faker");

test.use({ randomFirstName: faker.name.firstName() });
test.use({ randomLastName: faker.name.lastName() });
test.use({ randomPetName: faker.animal.dog() });

test.describe("Fixture", async () => {
  test("test with fixture", async ({page, createNewOwner, pageManager, randomFirstName, randomLastName, randomPetName}) => {
    await createNewOwner;

    await pageManager.getNavigationPage().openOwnersPage();
    await pageManager.getOwnersPage().selectOwnerByNameAndOpenInformationPage(randomFirstName + " " + randomLastName);

    await pageManager.getOwnerInformationPage().validateOwnerInformationHeader();

    const petInformation = await page.locator("table.table-striped").filter({ hasText: randomPetName });
    await petInformation.getByRole("button", { name: "Delete Visit" }).click();
    await expect(petInformation.getByRole("button", { name: "Delete Visit" })).not.toBeVisible();

    await petInformation.getByRole("button", { name: "Delete Pet" }).click();
    await expect(petInformation.getByRole("button", { name: "Delete Pet" })).not.toBeVisible();
  });
});
