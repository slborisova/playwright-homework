import { test, expect } from "@playwright/test";
import owners from "../test-data/owners.json";

test.describe("Owners", async () => {
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/owners", async (route) => {
      await route.fulfill({
        body: JSON.stringify(owners),
      });
    });

    await page.route("*/**/api/owners/289", async (route) => {
      await route.fulfill({
        body: JSON.stringify(owners[0]),
      });
    });

    await page.goto("/");
    await page.getByText("Owners").click();
    await page.getByText("Search").click();
    await expect(page.locator("h2")).toHaveText("Owners");
  });

  test("mocking API request", async ({ page }) => {
    await expect(page.locator(".ownerFullName")).toHaveCount(2);

    await page.getByText("Miranda Day").click();
    await expect(page.getByRole("heading").first()).toHaveText(
      "Owner Information"
    );

    await expect(page.locator(".ownerFullName")).toHaveText("Miranda Day");

    await expect(page.locator("app-pet-list")).toHaveCount(2);

    await expect(page.locator("app-pet-list").first()).toContainText("Buddy");
    await expect(page.locator("app-pet-list").last()).toContainText("Bella");

    await expect(page.locator("table.table-condensed").first().getByRole("button", { name: "Edit Visit" })).toHaveCount(10);
  });
});

test.describe("Veterinarians", async () => {
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/vets", async (route) => {
      const response = await route.fetch();
      const responseBody = await response.json();
      responseBody.forEach((vet) => {
        if (vet.firstName == "Sharon" && vet.lastName == "Jenkins") {
          vet.specialties.push(
            { id: 10000, name: "ophthalmology" },
            { id: 10001, name: "oncology" },
            { id: 10002, name: "immunology" },
            { id: 10003, name: "toxicology" },
            { id: 10004, name: "cardiology" },
            { id: 10005, name: "neurology" },
            { id: 10006, name: "urology" },
            { id: 10007, name: "avian" },
            { id: 10008, name: "equine" },
            { id: 10009, name: "nutrition" }
          );
        }
      });

      await route.fulfill({
        body: JSON.stringify(responseBody),
      });
    });
  });

  test("intercept api response", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click();
    await expect(page.locator("h2")).toHaveText("Veterinarians");

    await expect(page.locator("tr").filter({ hasText: "Sharon Jenkins" }).locator("td").nth(1)).toContainText("ophthalmology oncology immunology toxicology cardiology neurology urology avian equine nutrition")});
});

test("Add and delete an owner", async ({ page, request }) => {
  await page.goto("/");
  await page.getByText("Owners").click();
  await page.getByText("Search").click();
  await expect(page.locator("h2")).toHaveText("Owners");
  await page.getByRole("button", { name: "Add Owner" }).click();
  await expect(page.locator("h2")).toHaveText("New Owner");

  await page.locator("#firstName").fill("Jen");
  await page.locator("#lastName").fill("Smith");
  await page.locator("#address").fill("223 Marvel Rd");
  await page.locator("#city").fill("Mt. Martin");
  await page.locator("#telephone").fill("6085555481");

  await page.getByRole("button", { name: "Add Owner" }).click();

  const newOwnerResponse = await page.waitForResponse(
    "https://petclinic-api.bondaracademy.com/petclinic/api/owners"
  );
  const newOwnerJsonBody = await newOwnerResponse.json();
  const newOwnerId = newOwnerJsonBody.id;

  const newOwnerRow = page.getByRole("row", { name: "Jen Smith" });
  await expect(newOwnerRow.locator("td").nth(1)).toHaveText("223 Marvel Rd");
  await expect(newOwnerRow.locator("td").nth(2)).toHaveText("Mt. Martin");
  await expect(newOwnerRow.locator("td").nth(3)).toHaveText("6085555481");

  const deleteNewOwnerResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/owners/" + newOwnerId, {});
  expect(deleteNewOwnerResponse.status()).toEqual(204);

  await page.reload();
  await expect(page.locator("h2")).toHaveText("Owners");

  await expect(page.getByRole("row", { name: "Jen Smith" })).not.toBeVisible();
});
