import { test as base, expect } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";
import { faker } from "@faker-js/faker";

export type OwnerData = {
  randomFirstName: string;
  randomLastName: string;
  randomPetName: string;
};

export type NewOwner = {
  createNewOwner: OwnerData;
  pageManager: PageManager;
};

export const test = base.extend<NewOwner>({
 
  createNewOwner: async ({ page, request }, use) => {
    const newOwnerData: OwnerData = {
      randomFirstName: faker.person.firstName(),
      randomLastName: faker.person.lastName(),
      randomPetName: faker.animal.dog()
    }


    const randomAddress = faker.location.streetAddress();
    const randomCity = faker.location.city();
    const randomPhone = faker.phone.number();
    const randomVisitDescription = faker.lorem.sentence();

    await page.goto("/");
    await page.getByText("Owners").click();
    await page.getByText("Search").click();
    await expect(page.locator("h2")).toHaveText("Owners");
    await page.getByRole("button", { name: "Add Owner" }).click();
    await expect(page.locator("h2")).toHaveText("New Owner");

    await page.locator("#firstName").fill(newOwnerData.randomFirstName);
    await page.locator("#lastName").fill(newOwnerData.randomLastName);
    await page.locator("#address").fill(randomAddress);
    await page.locator("#city").fill(randomCity);
    await page.locator("#telephone").fill(randomPhone);

    await page.getByRole("button", { name: "Add Owner" }).click();

    const newOwnerResponse = await page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/owners");
    const newOwnerJsonBody = await newOwnerResponse.json();
    const newOwnerId = newOwnerJsonBody.id;

    const ownerRow = page.getByText(newOwnerData.randomFirstName + " " + newOwnerData.randomLastName);
    await ownerRow.click();

    await page.getByRole("button", { name: "Add New Pet" }).click();

    const nameInputField = page.getByRole("textbox", { name: "name" });
    await nameInputField.fill(newOwnerData.randomPetName);

    await page.getByLabel("Open calendar").click();
    await page.getByRole("button", { name: "Choose month and year" }).click();
    await page.getByRole("button", { name: "Previous 24 years" }).click();
    await page.getByText("2014").click();
    await page.getByText("MAY").click();
    await page.getByText("2", { exact: true }).click();

    const petTypeField = page.locator("#type");
    await petTypeField.selectOption("dog");

    const saveButton = page.getByRole("button", { name: "Save Pet" });
    await saveButton.click();

    await page.waitForResponse((response) => response.url().includes(`/pets`));

    const randomPetVisit = page.locator("table.table-striped").filter({ hasText: newOwnerData.randomPetName });
    const randomPetVisitAddVisitButton = randomPetVisit.getByRole("button", {name: "Add Visit"});

    await randomPetVisitAddVisitButton.click();

    const calendarIcon = page.getByLabel("Open calendar");
    await calendarIcon.click();
    const calendarTodayCell = page.locator(".mat-calendar-body-today");
    await calendarTodayCell.click();

    const descriptionInputField = page.locator("#description");
    await descriptionInputField.fill(randomVisitDescription);

    const randomVisitAddVisitButton = page.getByRole("button", {name: "Add Visit"});
    await randomVisitAddVisitButton.click();
    await page.waitForResponse((response) => response.url().includes(`/visits`));

    await use(newOwnerData);

    const deleteNewOwnerResponse = await request.delete(
      "https://petclinic-api.bondaracademy.com/petclinic/api/owners/" +
        newOwnerId,
      {}
    );
  },

  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
