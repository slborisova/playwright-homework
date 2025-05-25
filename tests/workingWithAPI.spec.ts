import { test, expect } from "@playwright/test";
import owners from "../test-data/owners.json";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://petclinic-api.bondaracademy.com/petclinic/api/owners",
    async (route) => {
      await route.fulfill({ body: JSON.stringify(owners) });
    }
  );

  await page.route(
    "https://petclinic-api.bondaracademy.com/petclinic/api/owners/289",
    async (route) => {
      await route.fulfill({
        body: JSON.stringify(owners[0]),
      });
    }
  );

  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
  await expect(page.locator("h2")).toHaveText("Owners");
});

test("mocking API request", async ({ page }) => {
  await expect(page.locator(".ownerFullName")).toHaveCount(2);

  await page.getByText("Miranda Day").click();
  await expect(page.getByRole("heading").first()).toHaveText("Owner Information");
    
  await expect(page.getByRole("heading").first()).toHaveText("Owner Information");

  await expect(page.locator(".ownerFullName")).toHaveText("Miranda Day");

  await expect(page.locator("app-pet-list")).toHaveCount(2);

  await expect(page.locator("app-pet-list").first()).toContainText("Buddy");
  await expect(page.locator("app-pet-list").last()).toContainText("Bella");

  await expect(page.locator("table.table-condensed").first().getByRole("button", { name: "Edit Visit" })).toHaveCount(10);
});
