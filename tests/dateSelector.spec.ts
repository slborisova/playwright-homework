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
    const petBirthDatePickerCell = page.locator('[class="mat-calendar-body-cell-content mat-focus-indicator"]');
    const birthDateInputField = page.locator('[name="birthDate"]');

    await expect(nameIcon).toHaveClass("glyphicon form-control-feedback glyphicon-remove");
    await nameInputField.fill("Tom");
    await page.waitForSelector("input#name + span.glyphicon-ok", {state: "visible"});
    await expect(nameIcon).toHaveClass("glyphicon form-control-feedback glyphicon-ok");

    await page.locator('[class="mat-mdc-button-touch-target"]').click();
    await page.locator('[class="mat-calendar-arrow"]').click();
    await page.getByRole("button", { name: "Previous 24 years" }).click();
    await petBirthDatePickerCell.getByText("2014").click();
    await petBirthDatePickerCell.getByText("MAY").click();
    await petBirthDatePickerCell.getByText("2", { exact: true }).click();

    await expect(birthDateInputField).toHaveValue("2014/05/02");

    await page.locator("#type").selectOption("dog");
    await page.getByRole("button", { name: "Save Pet" }).click();

    const tableStripedSelector = page.locator("table.table-striped").last().locator("tr td dd");
    await expect(tableStripedSelector.first()).toHaveText("Tom");
    await expect(tableStripedSelector.nth(1)).toHaveText("2014-05-02");
    await expect(tableStripedSelector.last()).toHaveText("dog");

    await page.getByRole("button", { name: "Delete Pet" }).last().click();

    await expect(tableStripedSelector.first()).toBeEmpty();
  });

  test("Select the dates of visits and validate dates order", async ({page}) => {
    await page.getByText("Jean Coleman").click();

    const samanthaTableStripedSelector = page.locator("table.table-striped").last().locator("tr td dd");
    const samanthaAddVisitButton = page.locator("table.table-striped").last().getByRole("button", { name: "Add Visit" });
    await expect(samanthaTableStripedSelector.first()).toHaveText("Samantha");
    await samanthaAddVisitButton.click();

    await expect(page.locator("h2")).toHaveText("New Visit");

    const newVisitTableStripedSelector = page.locator("table.table-striped").locator("tr td");
    await expect(newVisitTableStripedSelector.first()).toHaveText("Samantha");
    await expect(newVisitTableStripedSelector.last()).toHaveText("Jean Coleman");

    const calendarIcon = page.getByLabel("Open calendar");
    await calendarIcon.click();
    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentDate = `${currentYear}/${currentMonth}/${currentDay}`;

    const calendarTodayCell = page.locator('[class="mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today"]');
    await calendarTodayCell.click();

    const dateInputField = await page.locator('input[name="date"]');
    await expect(dateInputField).toHaveValue(currentDate);

    const descriptionInputField = await page.locator("#description");
    await descriptionInputField.fill("dermatologist visit");
    const newVisitAddVisitButton = await page.getByRole("button", {name: "Add Visit"});
    await newVisitAddVisitButton.click();

    const dermatologistVisitDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const petVisitsRow = page.locator("table.table-condensed").last().locator("tr td");
    await expect(petVisitsRow.first()).toHaveText(dermatologistVisitDate);

    await samanthaAddVisitButton.click();

    await calendarIcon.click();
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 45);
    const secondVisitYear = date.getFullYear();
    const secondVisitMonth = date.getMonth() + 1;
    const secondVisitDay = date.getDate();
    const secondVisitDate = `${secondVisitYear}/${secondVisitMonth}/${secondVisitDay}`;

    await calendarTodayCell.click();
    await expect(dateInputField).toHaveValue(secondVisitDate);

    await descriptionInputField.fill("massage therapy");
    await newVisitAddVisitButton.click();

    const massageTherapyVisitDate = `${secondVisitYear}-${secondVisitMonth}-${secondVisitDay}`;

    const samanthaTableCondensedSelector = page.locator("table.table-condensed").last().locator("tr");
    const firstDate = Date.parse(await samanthaTableCondensedSelector.nth(1).getByRole("cell").first().innerText());
    const secondDate = Date.parse(await samanthaTableCondensedSelector.nth(2).getByRole("cell").first().innerText());
    await expect(firstDate).toBeGreaterThan(secondDate);

    const validateDeletedVisits = page.locator("table.table-condensed").last().innerText();
    await samanthaTableCondensedSelector.getByRole('button', {name: 'Delete Visit'}).first().click();
    await expect(validateDeletedVisits).not.toContain(dermatologistVisitDate);
    await samanthaTableCondensedSelector.getByRole('button', {name: 'Delete Visit'}).first().click();
    await expect(validateDeletedVisits).not.toContain(massageTherapyVisitDate);
  });
});
