import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
});

test.describe("Date Selector", async () => {
  test("Select the desired date in the calendar", async ({ page }) => {
    await page.getByText("Harold Davis").click();

    await page.getByRole("button", { name: "Add New Pet" }).click();

    const nameInputField = page.getByRole("textbox", { name: "name" });
    const nameIcon = page.locator("input#name + span");
    const birthDateInputField = page.locator('[name="birthDate"]');

    await expect(nameIcon).toHaveClass(/glyphicon-remove/);
    await nameInputField.fill("Tom");
    await expect(nameIcon).toHaveClass(/glyphicon-ok/);

    await page.getByLabel("Open calendar").click();
    await page.getByRole("button", { name: "Choose month and year" }).click();
    await page.getByRole("button", { name: "Previous 24 years" }).click();
    await page.getByText("2014").click();
    await page.getByText("MAY").click();
    await page.getByText("2", { exact: true }).click();

    await expect(birthDateInputField).toHaveValue("2014/05/02");

    await page.locator("#type").selectOption("dog");
    await page.getByRole("button", { name: "Save Pet" }).click();

    const lastPetVisit = page.locator("table.table-striped").last().locator("tr td dd");
    await expect(lastPetVisit.first()).toHaveText("Tom");
    await expect(lastPetVisit.nth(1)).toHaveText("2014-05-02");
    await expect(lastPetVisit.last()).toHaveText("dog");

    await page.getByRole("button", { name: "Delete Pet" }).last().click();

    await expect(lastPetVisit.first()).toBeEmpty();
  });

  test("Select the dates of visits and validate dates order", async ({page}) => {
    await page.getByText("Jean Coleman").click();

    const lastPetVisit = page.locator("table.table-striped").last();
    const petsVisitsAddVisitButton = lastPetVisit.getByRole("button", {name: "Add Visit"});
    await petsVisitsAddVisitButton.click();

    await expect(page.getByRole("heading")).toHaveText("New Visit");

    const newVisitPetTable = page.locator("table.table-striped").locator("tr td");
    await expect(newVisitPetTable.first()).toHaveText("Samantha");
    await expect(newVisitPetTable.last()).toHaveText("Jean Coleman");

    const calendarIcon = page.getByLabel("Open calendar");
    await calendarIcon.click();
    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const currentDay = date.getDate().toString().padStart(2, "0");
    const currentDate = `${currentYear}/${currentMonth}/${currentDay}`;

    const calendarTodayCell = page.locator(".mat-calendar-body-today");
    await calendarTodayCell.click();

    const dateInputField = await page.locator('[name="date"]');
    await expect(dateInputField).toHaveValue(currentDate);

    const descriptionInputField = page.locator("#description");
    await descriptionInputField.fill("dermatologist visit");
    const newVisitAddVisitButton = page.getByRole("button", {name: "Add Visit"});
    await newVisitAddVisitButton.click();

    const dermatologistVisitDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const lastPetVisitSection = page.locator("table.table-condensed").last();
    const lastPetVisitCellDate = lastPetVisitSection.locator("tr td");
    await expect(lastPetVisitCellDate.first()).toHaveText(dermatologistVisitDate);

    await petsVisitsAddVisitButton.click();

    await calendarIcon.click();
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 45);
    const secondVisitYear = date.getFullYear();
    const secondVisitMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const secondVisitDay = date.getDate().toString().padStart(2, "0");
    const secondVisitDate = `${secondVisitYear}/${secondVisitMonth}/${secondVisitDay}`;

    await calendarTodayCell.click();
    await expect(dateInputField).toHaveValue(secondVisitDate);

    await descriptionInputField.fill("massage therapy");
    await newVisitAddVisitButton.click();

    const massageTherapyVisitDate = `${secondVisitYear}-${secondVisitMonth}-${secondVisitDay}`;

    const firstDate = Date.parse(dermatologistVisitDate);
    const secondDate = Date.parse(massageTherapyVisitDate);
    expect(firstDate).not.toBeLessThan(secondDate);

    let lastPetVisitSectionCreatedVisits = await lastPetVisitSection.innerText();
    const dermatologistVisit = lastPetVisitSection.locator("tr").filter({ hasText: "dermatologist visit" });
    await dermatologistVisit.getByRole("button", { name: "Delete Visit" }).first().click();
    
    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/visits") && response.status() === 204
    );

    lastPetVisitSectionCreatedVisits = await lastPetVisitSection.innerText();
    expect(lastPetVisitSectionCreatedVisits).not.toContain("dermatologist visit");

    let massageTherapyVisit = lastPetVisitSection.locator("tr").filter({ hasText: "massage therapy" });
    await massageTherapyVisit.getByRole("button", { name: "Delete Visit" }).first().click();
    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/visits") && response.status() === 204
    );
    lastPetVisitSectionCreatedVisits = await lastPetVisitSection.innerText();
    expect(lastPetVisitSectionCreatedVisits).not.toContain("massage therapy");
  });
});
