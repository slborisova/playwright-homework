import { test, expect } from "@playwright/test";

test.describe("Web Tables-Owners", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Owners").click();
    await page.getByText("Search").click();
    await expect(page.locator("h2")).toHaveText("Owners");
  });

  test("Validate the pet name city of the owner", async ({ page }) => {
    const targetRow = page.getByRole("row", { name: "Jeff Black" });
    await expect(targetRow.locator("td").nth(2)).toHaveText("Monona");
    await expect(targetRow.locator("td").nth(4)).toHaveText("Lucky");
  });

  test("Validate owners count of the Madison city", async ({ page }) => {
    await expect(
      page.locator("tbody tr").filter({ hasText: "Madison" })
    ).toHaveCount(4);
  });

  test("Validate search by Last Name", async ({ page }) => {
    const lastNameInputfield = page.getByRole("textbox");
    const findOwnerButton = page.getByRole("button", { name: "Find Owner" });

    await lastNameInputfield.click();
    await lastNameInputfield.fill("Black");
    await findOwnerButton.click();

    await expect(lastNameInputfield).toHaveValue("Black");

    await lastNameInputfield.click();
    await lastNameInputfield.clear();
    await lastNameInputfield.fill("Davis");
    await findOwnerButton.click();

    const ownerFullNameRows = page.locator("tbody tr");

    for (let row of await ownerFullNameRows.all()) {
      await expect(row.locator("td").first()).toContainText("Davis");
    }

    await lastNameInputfield.click();
    await lastNameInputfield.clear();
    await lastNameInputfield.fill("Es");
    await findOwnerButton.click();

    // await page.waitForTimeout(500);// ?
    // for (let row of await ownerFullNameRows.all()) {
    //   await expect(row.locator("td").first()).toContainText("Es");
    // }

    await lastNameInputfield.click();
    await lastNameInputfield.clear();
    await lastNameInputfield.fill("Playwright");
    await findOwnerButton.click();
    expect(
      page.getByText('No owners with LastName starting with "Playwright"')
    );
  });

  test("Validate phone number and pet name on the Owner Information page", async ({
    page,
  }) => {
    const targetRow = page.getByRole("row", { name: "6085552765" });
    const petName = await targetRow.locator("td").nth(4).textContent();
    await targetRow.getByRole("link").click();

    await expect(
      page.getByRole("row", { name: "Telephone" }).getByRole("cell").last()
    ).toHaveText("6085552765");

    await expect(
      page.locator("table.table-striped").last().locator("tr td dd").first()
    ).toHaveText(petName);
  });

  test("Validate pets of the Madison city", async ({ page }) => {
    const madisonPetRows = page.locator("tbody tr", { hasText: "Madison" });
    const pets = [];

    await expect(
      page.locator("tbody tr").filter({ hasText: "Madison" })
    ).toHaveCount(4);

    for (let row of await madisonPetRows.all()) {
      pets.push(
        (await row.locator("td").last().textContent()).toString().trim()
      );
    }
    expect(pets).toEqual(["Leo", "George", "Mulligan", "Freddy"]);
  });
});

test.describe("Web Tables-Veterinarians", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click();
  });

  test("Validate specialty update", async ({ page }) => {
    const targetRow = page.getByRole("row", { name: "Rafael Ortega" });
    await expect(targetRow.locator("td").nth(1)).toHaveText("surgery");

    await page.getByRole("link", { name: "Specialties" }).click();

    await expect(page.locator("h2")).toHaveText("Specialties");

    await page
      .getByRole("row", { name: "surgery" })
      .getByRole("button", { name: "Edit" })
      .click();

    await expect(page.locator("h2")).toHaveText("Edit Specialty");

    const specialtyNameInputField = page.getByRole("textbox");
    await specialtyNameInputField.click();
    await specialtyNameInputField.clear();
    await specialtyNameInputField.fill("dermatology");
    await page.getByRole("button", { name: "Update" }).click();

    expect(page.getByRole("row", { name: "dermatology" }));

    await page.getByText("Veterinarians").click();
    await page.getByText("All").click();
    await expect(targetRow.locator("td").nth(1)).toHaveText("dermatology");

    await page.getByRole("link", { name: "Specialties" }).click();
    await page
      .getByRole("row", { name: "dermatology" })
      .getByRole("button", { name: "Edit" })
      .click();
    await specialtyNameInputField.click();
    await specialtyNameInputField.clear();
    await specialtyNameInputField.fill("surgery");
    await page.getByRole("button", { name: "Update" }).click();
  });
});

test.describe("Web Tables-Specialties", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Specialties").click();
  });

  test("Validate specialty lists", async ({ page }) => {
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("#name").fill("oncology");
    await page.getByRole("button", { name: "Save" }).click();

    await page.waitForTimeout(1000);

    const specialties = [];
    const specialtyRows = page.locator("tbody tr input");

    for (let specialty of await specialtyRows.all()) {
      const specialtyName = await specialty.inputValue();
      specialties.push(specialtyName);
    }

    expect(specialties).toEqual([
      "radiology",
      "surgery",
      "dentistry",
      "New specialty",
      "oncology",
    ]);

    await page.getByText("Veterinarians").click();
    await page.getByText("All").click();

    const targetRow = page.getByRole("row", { name: "Sharon Jenkins" });
    await targetRow.getByRole("button", { name: "Edit Vet" }).click();

    await page.locator(".dropdown-arrow").click();

    const allBoxes = await page
      .locator('//input[@type="checkbox"]/following-sibling::label')
      .allInnerTexts();

    expect(allBoxes).toEqual(specialties);

    await page.getByRole("checkbox", { name: "oncology" }).check();
    await page.getByRole("checkbox", { name: "New specialty" }).uncheck();
    await page.locator(".dropdown-arrow").click();
    await page.getByRole("button", { name: "Save Vet" }).click();

    await expect(targetRow.locator("td").nth(1)).toHaveText("oncology");

    await page.getByRole("link", { name: "Specialties" }).click();

    await page.getByRole("button", { name: "Delete" }).last().click();
    await page.waitForTimeout(1000);

    await page.goto("/");
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click();
    await expect(targetRow.locator("td").nth(1)).toBeEmpty();
  });
});
