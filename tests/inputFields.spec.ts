import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTitle("pettypes").click();
  await expect(page.locator("h2")).toHaveText("Pet Types");
});

test.describe("Interacting with Input Fields", async () => {
  test("Update pet type", async ({ page }) => {
    const editPetTypeInputField = page.getByRole("textbox");
    const editButton = page.getByRole("button", { name: "Edit" });
    const updateButton = page.getByRole("button", { name: "Update" });

    await editButton.first().click();

    await expect(page.locator("h2")).toHaveText("Edit Pet Type");

    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();
    await editPetTypeInputField.fill("rabbit");
    await updateButton.click();

    await expect(page.locator('[id="0"]')).toHaveValue("rabbit");

    await editButton.first().click();

    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();
    await editPetTypeInputField.fill("cat");
    await updateButton.click();

    await expect(page.locator('[id="0"]')).toHaveValue("cat");
  });

  test("Cancel pet type update", async ({ page }) => {
    const editPetTypeInputField = page.getByRole("textbox");

    await page.getByRole("button", { name: "Edit" }).nth(1).click();
    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();
    await editPetTypeInputField.fill("moose");

    await expect(editPetTypeInputField).toHaveValue("moose");

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page.locator('[id="1"]')).toHaveValue("dog");
  });

  test("Pet type name is required validation", async ({ page }) => {
    const editPetTypeInputField = page.getByRole("textbox");

    await page.getByRole("button", { name: "Edit" }).nth(2).click();

    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();

    await expect(page.locator('.help-block')).toHaveText( "Name is required");

    await page.getByRole("button", { name: "Update" }).click();

    await expect(page.locator("h2")).toHaveText("Edit Pet Type");

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page.locator("h2")).toHaveText("Pet Types");
  });
});
