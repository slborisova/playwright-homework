import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
  await expect(page.locator("h2")).toHaveText("Owners");
});

test.describe("Lists and Drop Downs", async () => {
  test("Validate selected pet types from the list", async ({ page }) => {
    const petTypeInputField = page.locator("#type1");
    const petTypeDropdownMenu = page.locator("#type");
    await page.getByText("George Franklin").click();

    await expect(page.locator(".ownerFullName")).toHaveText("George Franklin");

    const petLeoSection = page.locator("app-pet-list", { name: "Leo" });
    await petLeoSection.getByRole("button", { name: "Edit Pet" }).click();

    await expect(page.locator("h2")).toHaveText("Pet");

    await expect(page.locator("#owner_name")).toHaveValue("George Franklin");

    await expect(petTypeInputField).toHaveValue("cat");

    await petTypeDropdownMenu.click();
    const typeList = page.locator("#type option");
    const types = ["cat", "dog", "lizard", "snake", "animal", "hamster"];
    await expect(typeList).toHaveText(types);

    for (const type of types) {
      await petTypeDropdownMenu.selectOption(type);
      await expect(petTypeInputField).toHaveValue(type);
    }
  });

  test("Validate the pet type update", async ({ page }) => {
    const petTypeInputField = page.locator("#type1");
    const petTypeDropdownMenu = page.locator("#type");
    await page.getByText("Eduardo Rodriquez").click();

    const petRosySection = page.locator("app-pet-list", { name: "Rosy" });
    await petRosySection
      .getByRole("button", { name: "Edit Pet" })
      .first()
      .click();

    await expect(petTypeInputField).toHaveValue("dog");

    await petTypeDropdownMenu.selectOption("lizard");

    await expect(petTypeInputField).toHaveValue("lizard");
    await expect(petTypeDropdownMenu).toHaveValue("lizard");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(petRosySection.locator(".dl-horizontal dd").last()).toHaveText(
      "lizard"
    );

    await petRosySection
      .getByRole("button", { name: "Edit Pet" })
      .first()
      .click();

    await expect(petTypeInputField).toHaveValue("lizard");

    await petTypeDropdownMenu.click();
    await petTypeDropdownMenu.selectOption("dog");

    await expect(petTypeInputField).toHaveValue("dog");
    await expect(petTypeDropdownMenu).toHaveValue("dog");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(petRosySection.locator(".dl-horizontal dd").last()).toHaveText(
      "lizard"
    );
  });
});
