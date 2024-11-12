import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
  await expect(page.locator("h2")).toHaveText("Owners");
});

test.describe("Lists and Drop Downs", async () => {
  test("Validate selected pet types from the list", async ({ page }) => {
    const type1Input = page.locator("#type1");
    const petTypeSelect = page.locator("#type");
    await page.getByText("George Franklin").click();

    await expect(page.locator(".ownerFullName")).toHaveText("George Franklin");

    const petLeoSection = page.locator("app-pet-list", { name: "Leo" });
    await petLeoSection
      .getByRole("button", { name: "Edit Pet" })
      .first()
      .click();

    await expect(page.locator("h2")).toHaveText("Pet");

    await expect(page.locator("#owner_name")).toHaveValue("George Franklin");

    await expect(type1Input).toHaveValue("cat");

    await petTypeSelect.click();
    const typeList = page.locator("#type option");
    const types = ["cat", "dog", "lizard", "snake", "animal", "hamster"];
    await expect(typeList).toHaveText(types);

    for (const type of types) {
      await petTypeSelect.selectOption(type);
      await expect(type1Input).toHaveValue(type);
    }
  });

  test("Validate the pet type update", async ({ page }) => {
    const type1Input = page.locator("#type1");
    const petTypeSelect = page.locator("#type");
    await page.getByText("Eduardo Rodriquez").click();

    const petRosySection = page.locator("app-pet-list", { name: "Rosy" });
    await petRosySection
      .getByRole("button", { name: "Edit Pet" })
      .first()
      .click();

    await expect(type1Input).toHaveValue("dog");

    await petTypeSelect.selectOption("lizard");

    await expect(type1Input).toHaveValue("lizard");
    await expect(petTypeSelect).toHaveValue("lizard");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(petRosySection.locator(".dl-horizontal dd").last()).toHaveText(
      "lizard"
    );

    await petRosySection
      .getByRole("button", { name: "Edit Pet" })
      .first()
      .click();

    await expect(type1Input).toHaveValue("lizard");

    await petTypeSelect.click();
    await petTypeSelect.selectOption("dog");

    await expect(type1Input).toHaveValue("dog");
    await expect(petTypeSelect).toHaveValue("dog");

    await page.getByRole("button", { name: "Update Pet" }).click();

    await expect(petRosySection.locator(".dl-horizontal dd").last()).toHaveText(
      "lizard"
    );
  });
});
