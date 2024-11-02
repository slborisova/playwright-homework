import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTitle("pettypes").click();
  await expect(page.locator("h2")).toHaveText("Pet Types");
});

test.describe("Interacting with Input Fields", async () => {
  test("Update pet type", async ({ page }) => {
    const editPetType = page.getByRole("textbox");
    const editButton = page.getByRole("button", { name: "Edit" });
    const updateButton = page.getByRole("button", { name: "Update" });

    await editButton.first().click();

    await expect(page.locator("h2")).toHaveText("Edit Pet Type");

    await editPetType.click();
    await editPetType.clear();
    await editPetType.fill("rabbit");
    await updateButton.click();

    await expect(page.locator('[id="0"]')).toHaveValue("rabbit");

    await editButton.first().click();

    await editPetType.click();
    await editPetType.clear();
    await editPetType.fill("cat");
    await updateButton.click();

    await expect(page.locator('[id="0"]')).toHaveValue("cat");
  });

  test("Cancel pet type update", async ({ page }) => {
    const editPetType = page.getByRole("textbox");

    await page.getByRole("button", { name: "Edit" }).nth(1).click();
    await editPetType.click();
    await editPetType.clear();
    await editPetType.fill("moose");

    await expect(editPetType).toHaveValue("moose");

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page.locator('[id="1"]')).toHaveValue("dog");
  });

  test("Pet type name is required validation", async ({ page }) => {
    const editPetType = page.getByRole("textbox");

    await page.getByRole("button", { name: "Edit" }).nth(2).click();

    await editPetType.click();
    await editPetType.clear();

    await expect(page.locator('[class="help-block"]')).toHaveText( "Name is required");

    await page.getByRole("button", { name: "Update" }).click();

    await expect(page.locator("h2")).toHaveText("Edit Pet Type");

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page.locator("h2")).toHaveText("Pet Types");
  });
});
