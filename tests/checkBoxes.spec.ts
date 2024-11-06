import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Veterinarians").click();
  await page.getByText("All").click();
  await expect(page.locator("h2")).toHaveText("Veterinarians");
});

test.describe("Check Boxes", async () => {
  test("Validate selected specialties", async ({ page }) => {
    const specialtiesInputField = page.locator(".selected-specialties");

    await page.getByRole("button", {name: "Edit Vet"}).nth(1).click();

    await expect(specialtiesInputField).toHaveText("radiology");

    await page.locator(".dropdown-arrow").click();

    expect(await page.getByRole("checkbox", {name: "radiology"}).isChecked()).toBeTruthy();

    expect(await page.getByRole("checkbox", {name: "surgery"}).isChecked()).toBeFalsy();
    expect(await page.getByRole("checkbox", {name: "dentistry"}).isChecked()).toBeFalsy();

    await page.getByRole("checkbox", {name: "surgery"}).check();
    await page.getByRole("checkbox", {name: "radiology"}).uncheck();

    await expect(specialtiesInputField).toHaveText("surgery");

    await page.getByRole("checkbox", {name: "dentistry"}).check();

    await expect(specialtiesInputField).toHaveText("surgery, dentistry");
  });

  test("Select all specialties", async ({ page }) => {
    const specialtiesInputField = page.locator(".selected-specialties");

    await page.getByRole("button", {name: "Edit Vet"}).nth(3).click();

    await expect(specialtiesInputField).toHaveText("surgery");

    await page.locator(".dropdown-arrow").click();

    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.check();
      expect(await box.isChecked()).toBeTruthy();
    }
    await expect(specialtiesInputField).toHaveText( "surgery, radiology, dentistry, New specialty");
  });

  test("Unselect all specialties", async ({ page }) => {
    const specialtiesInputField = page.locator(".selected-specialties");

    await page.getByRole("button", {name: "Edit Vet"}).nth(2).click();

    await expect(specialtiesInputField).toHaveText("dentistry, surgery");

    await page.locator(".dropdown-arrow").click();

    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.uncheck();
      expect(await box.isChecked()).toBeFalsy();
    }
    await expect(specialtiesInputField).toBeEmpty();
  });
});
