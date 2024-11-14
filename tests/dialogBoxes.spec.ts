import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTitle("pettypes").click();
  await expect(page.locator("h2")).toHaveText("Pet Types");
});

test.describe("Dialog Boxes", async () => {
  test("Add and delete pet type", async ({ page }) => {
    await page.getByRole("button", { name: "Add" }).click();

    const nameInputField = page.locator("#name");
    await expect(nameInputField).toBeVisible();

    await nameInputField.fill("pig");
    await page.getByRole("button", { name: "Save" }).click();

    const petTypesTableInputFields = page.locator("table tr td input");
    await expect(petTypesTableInputFields.last()).toHaveValue("pig");

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Delete the pet type?");
      dialog.accept();
    });

    await page
      .locator("table tr")
      .last()
      .getByRole("button", { name: "Delete" })
      .click();
    await expect(petTypesTableInputFields.last()).not.toHaveValue("pig");
  });
});
