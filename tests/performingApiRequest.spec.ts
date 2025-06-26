import { test, expect, request } from "@playwright/test";

const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1VZHplZHhGUlZKaS04Z0lTTWRsOSJ9.eyJ0b2tlbl9lbWFpbCI6ImxhbmFib3Jpc292YXdvcmtAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9ib25kYXJhY2FkZW15LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NzAwNzExN2U3YTMwNTE0NjUxYWRlMWEiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdDo5OTY2L3BldGNsaW5pYy9hcGkvIiwiaHR0cHM6Ly9ib25kYXJhY2FkZW15LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NTA4OTg1MTgsImV4cCI6MTc1MDk4NDkxOCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6ImNXc2ZkcXVWTjJPamJVZk4zUFZ0cVhjU291eFBoendmIn0.jyYcXXZ994Vj8xYykUJrFcLPodZjBzevbfwB7-vbSjVFCZhMvVpPGuIqH8eupaAOHA7Q147k6mMf1cUU8fggIr8WHT0Wh0QWvcRzYKP7UT1zgSAjN4jQY0sbLDZYQfmBnom6Lds7mwUnt9aX6GUmqJvqR66thnLJQR5u_QVrgLBlwIwHhgBmdD2j64xrjfjg-Wx3MPEuY0n9UUoiu28NB6oEWDUTcvE4elM97baMTKvQXQ8LwS7xxMxaDNp8WOv02nZie3XSHHdBqDZIvmhvwenLS8WmMwmUth4taZN5VuiCdvLwGq9lZf5ZqWnHaBJHsORw6Zra_4VBKnxcNZ7qPg";

test.describe("Specialties", async () => {
  test("Delete specialty validation", async ({ page, request }) => {
    // const response = await request.post(
    //   "https://bondaracademy.us.auth0.com/oauth/token",
    //   {
    //     data: "client_id=cWsfdquVN2OjbUfN3PVtqXcSouxPhzwf&redirect_uri=https%3A%2F%2Fpetclinic.bondaracademy.com%2Fcallback&code_verifier=a8YeXhx2Q53DAP3cyqCAURDSrYOnkNKzu_BmgDoo_bj&code=DmBcR95DxDz-GwicnkJz3Gxmzs4dTQpMkY5QQTWkkUPHo&grant_type=authorization_code",
    //   }
    // );
    // const responseBody = await response.json();
    // const accessToken = responseBody.access_token;

    //const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1VZHplZHhGUlZKaS04Z0lTTWRsOSJ9.eyJ0b2tlbl9lbWFpbCI6ImxhbmFib3Jpc292YXdvcmtAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9ib25kYXJhY2FkZW15LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NzAwNzExN2U3YTMwNTE0NjUxYWRlMWEiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdDo5OTY2L3BldGNsaW5pYy9hcGkvIiwiaHR0cHM6Ly9ib25kYXJhY2FkZW15LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NTA3Njk1MTMsImV4cCI6MTc1MDg1NTkxMywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6ImNXc2ZkcXVWTjJPamJVZk4zUFZ0cVhjU291eFBoendmIn0.psXL8nSZNXe0mksSc8Mpj3_3E_dlNFu2DDm15NZGekkdmL0RoGPJYRdlOQjnsHJinutwsOBKuQG6BFodwdyUSdtMLPOs2WQ0F9bIbBGEfFKPkx-rmjywLLUdl65Kz5HUH3nOT_bI3aIwGm0iy8TzE7XSLHW5VvURCKYepoJmws05AWF22CU2BA4upo2wSUPimkOJySTFul_KPrFno4-MekMRN2rlNMFWgO5mxd0PXiOR7NXk6Xhi-eFzPaQJbTSPHEmP4iHIGjTgKkDTB-rjdYJYQhuwZ22qORLJONx5TLfsAinWNXrcR8lxqkxmPkPDJY5vFHM-U4G7LJvORcyjpg";
    const specialtyResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/specialties",
      {
        data: {
          name: "api testing expert",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    expect(specialtyResponse.status()).toEqual(201);

    await page.goto("/");
    await page.getByRole("link", { name: "Specialties" }).click();
    await expect(page.locator("h2")).toHaveText("Specialties");

    await expect(page.getByRole("row", { name: "api testing expert" })).toBeVisible();

    await page.getByRole("button", { name: "Delete" }).last().click();
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
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
        );
        expect(newVetResponse.status()).toEqual(201);
        const responseBody = await newVetResponse.json();
        expect(responseBody.firstName).toEqual("NewVetFirstName");
        expect(responseBody.lastName).toEqual("NewVetLastName");

        await page.goto("/");
        await page.getByText("Veterinarians").click();
        await page.getByText("All").click();
        await expect(page.locator("h2")).toHaveText("Veterinarians");

        const newVetRow = page.getByRole("row", { name: "NewVetFirstName NewVetLastName" });
        expect(newVetRow.last()).toBeVisible();
        await expect(newVetRow.locator("td").nth(1)).toBeEmpty();
        
        await newVetRow.getByRole("button", { name: "Edit Vet" }).click();

        await page.locator('.dropdown-display').click();
        await page.getByRole('checkbox', {name: "dentistry"}).check();
        await page.locator('.dropdown-display').click();

        await page.getByRole("button", { name: "Save Vet" }).click();

        await expect(newVetRow.locator("td").nth(1)).toContainText("dentistry");

        const deleteNewVetPesponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/vets/"+responseBody.id, 
           {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
           } 
        );

        expect(deleteNewVetPesponse.status()).toEqual(204);
    });

      test ('New specialty is displayed', async({page, request}) => {
          const specialtyResponse = await request.post("https://petclinic-api.bondaracademy.com/petclinic/api/specialties",
          {
            data: {
              name: "api testing ninja",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
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
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
        );
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

        const editedVetRow = page.getByRole("row", { name: "NewVetFirstName NewVetLastName" });
        await expect(editedVetRow.locator("td").nth(1)).toContainText('api testing ninja');

        const deleteNewVetResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/vets/"+responseVetBody.id, 
           {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
           } 
        );
        expect(deleteNewVetResponse.status()).toEqual(204);

        const deleteSpecialtyResponse = await request.delete("https://petclinic-api.bondaracademy.com/petclinic/api/specialties/"+responseSpecialtyBody.id, 
           {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
           } 
        );
        expect(deleteSpecialtyResponse.status()).toEqual(204);

        await page.goto("/");
        await page.getByRole("link", { name: "Specialties" }).click();
        await expect(page.locator("h2")).toHaveText("Specialties");
        await expect(page.getByRole("row", { name: "api testing ninja" })).not.toBeVisible();
      });
  })
});
