import { test, expect, request } from "@playwright/test";

test.describe("Specialties", async () => {
  test("Delete specialty validation", async ({ page, request }) => {
    const specialtyResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/specialties",
      {
        data: {
          name: "api testing expert",
        },
      }
    );
    expect(specialtyResponse.status()).toEqual(201);

    await page.goto("/");
    await page.getByRole("link", { name: "Specialties" }).click();
    await expect(page.getByRole("heading")).toHaveText("Specialties");

    await expect(page.getByRole("row", { name: "api testing expert" })).toBeVisible();

    await page.getByRole("row", { name: "api testing expert" }).getByRole("button", { name: "Delete" }).click()
    await expect(page.getByRole("row", { name: "api testing expert" })).not.toBeVisible();
  });

  test.describe('Veterinarians', async() => {
      test ('Add and delete veterinarian', async({page, request}) => {
        const newVetResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/vets",
        {
            data: {
            firstName: "NewVetFirstName",
            lastName: "NewVetLastName",
            id: null,
            specialties: []
            },
        });
        expect(newVetResponse.status()).toEqual(201);
        const responseBody = await newVetResponse.json();
        expect(responseBody.firstName).toEqual("NewVetFirstName");
        expect(responseBody.lastName).toEqual("NewVetLastName");

        await page.goto("/");
        await page.getByText("Veterinarians").click();
        await page.getByText("All").click();
        await expect(page.locator("h2")).toHaveText("Veterinarians");

        const newVetRow = page.getByRole("row", { name: "NewVetFirstName NewVetLastName" });
        await expect(newVetRow.last()).toBeVisible();
        await expect(newVetRow.locator("td").nth(1)).toBeEmpty();
        
        await newVetRow.getByRole("button", { name: "Edit Vet" }).click();

        await page.locator('.dropdown-display').click();
        await page.getByRole('checkbox', {name: "dentistry"}).check();
        await page.locator('.dropdown-display').click();

        await page.getByRole("button", { name: "Save Vet" }).click();

        await expect(newVetRow.locator("td").nth(1)).toContainText("dentistry");

        const deleteNewVetResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/vets/"+responseBody.id, 
           {} 
        );

        expect(deleteNewVetResponse.status()).toEqual(204);
    });

      test ('New specialty is displayed', async({page, request}) => {
          const specialtyResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/specialties",
          {
            data: {
              name: "api testing ninja",
            },
          });
        expect(specialtyResponse.status()).toEqual(201);
        const responseSpecialtyBody = await specialtyResponse.json();

        const newVetResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/vets",
        {
            data: {
            firstName: "NewVetFirstName",
            lastName: "NewVetLastName",
            id: null,
            specialties: [{"id":1606,"name":"surgery"}]
            },
         });
        expect(newVetResponse.status()).toEqual(201);
        const responseVetBody = await newVetResponse.json();

        await page.goto("/");
        await page.getByText("Veterinarians").click();
        await page.getByText("All").click();
        await expect(page.locator("h2")).toHaveText("Veterinarians");

        const newVetRow = page.getByRole("row", { name: "NewVetFirstName NewVetLastName" });
        expect(newVetRow.last()).toBeVisible();
        await expect(newVetRow.locator("td").nth(1)).toContainText('surgery');

        await newVetRow.getByRole("button", { name: "Edit Vet" }).click();  

        await page.locator('.dropdown-display').click();
        await page.getByRole('checkbox', {name: "surgery"}).uncheck();
        await page.getByRole('checkbox', {name: "api testing ninja"}).check();
        await page.locator('.dropdown-display').click();
        await page.getByRole("button", { name: "Save Vet" }).click();

        await expect(newVetRow.locator("td").nth(1)).toContainText('api testing ninja');

        const deleteNewVetResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/vets/"+responseVetBody.id, 
           {} 
        );
        expect(deleteNewVetResponse.status()).toEqual(204);

        const deleteSpecialtyResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/specialties/"+responseSpecialtyBody.id, 
           {} 
        );
        expect(deleteSpecialtyResponse.status()).toEqual(204);
        
        await page.goto("/");
        await page.getByRole("link", { name: "Specialties" }).click();
        await expect(page.locator("h2")).toHaveText("Specialties");

        await page.waitForResponse((response) =>
              response.url().includes(`api/specialties`)
            );
        await expect(page.getByRole("row", { name: "api testing ninja" })).not.toBeVisible();
      });
  })
});
