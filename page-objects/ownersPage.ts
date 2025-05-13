import { Page, expect } from "@playwright/test";

export class OwnersPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectOwnerByNameAndOpenInformationPage(ownerName: string) {
    const ownerRow = this.page.getByText(ownerName);
    await ownerRow.click();
  }

   async validatePetAndCityNamesOfOwner(ownerName: string, cityName: string,petName: string) {
    const targetRow = this.page.getByRole("row", { name: ownerName });
    await expect(targetRow.locator("td").nth(2)).toHaveText(cityName);
    await expect(targetRow.locator("td").nth(4)).toHaveText(petName);
  }

  async validateAmountOfCities(cityName: string, cityAmount: number) {
    await expect(this.page.locator("tbody tr").filter({ hasText: cityName })).toHaveCount(cityAmount);
  }

  async setOwnerLastNameSearch(ownerLastName: string) {
    const lastNameInputfield = this.page.getByRole("textbox");
    const findOwnerButton = this.page.getByRole("button", {name: "Find Owner"});
    await lastNameInputfield.click();
    await lastNameInputfield.clear();
    await lastNameInputfield.fill(ownerLastName);
    await findOwnerButton.click();
    await this.page.waitForResponse((response) =>
      response.url().includes(`/api/owners?lastName=${ownerLastName}`)
    );
  }

  async validateSelectedLastName(ownerLastName: string) {
    const ownerFullNameCells = this.page.locator(".ownerFullName");

    for (let ownerCells of await ownerFullNameCells.all()) {
      if (ownerLastName == "Playwright") {
        expect(await this.page.getByRole("table").textContent()).toContain('No owners with LastName starting with "Playwright"');
      } else {
        expect(ownerCells).toContainText(ownerLastName);
      }
    }
  }

  async getPetNameByPhoneNumber(phoneNumber: string): Promise<string> {
    const targetRow = this.page.getByRole("row", { name: phoneNumber });
    const petName = await targetRow.locator("td").nth(4).textContent();
    return petName!;
  }

  async openInformationOwnerPageByPhoneNumber(phoneNumber: string) {
    const targetRow = this.page.getByRole("row", { name: phoneNumber });
    await targetRow.getByRole("link").click();
  }

  async countSelectedCityPetRows(cityName: string, petAmount: number) {
    await expect(this.page.locator("tbody tr").filter({ hasText: cityName })).toHaveCount(petAmount);
  }

  async validatePetNameForCity(cityName: string) {
    const selectedCityPetRows = this.page.locator("tbody tr", {hasText: cityName});
    const pets: string[] = [];
    for (let row of await selectedCityPetRows.all()) {
      const petName = await row.locator("td").last().textContent();
      pets.push(petName!.trim());
    }
    expect(pets).toEqual(["Leo", "George", "Mulligan", "Freddy"]);
  }
}
