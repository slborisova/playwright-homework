import { Page, expect } from "@playwright/test";

export class VeterinariansPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validateVeterinarianSpecialty(veterinarianName: string, veterinarianSpecialty: string){
    const targetRow = this.page.getByRole("row", { name: veterinarianName });
    await expect(targetRow.locator("td").nth(1)).toHaveText(veterinarianSpecialty);
  }

  async editVeterinarian(veterinarianName: string){
    const targetRow = this.page.getByRole("row", { name: veterinarianName });
    await targetRow.getByRole("button", { name: "Edit Vet" }).click();
  }

  async validateChangedVeterinarianSpecialty(veterinarianName: string, specialtyName: string){
    const targetRow = this.page.getByRole("row", { name: veterinarianName });
    await expect(targetRow.locator("td").nth(1)).toHaveText(specialtyName);
  }

  async validateVeterinarianEmptySpecialty(veterinarianName: string){
    const targetRow = this.page.getByRole("row", { name: veterinarianName });
    await expect(targetRow.locator("td").nth(1)).toBeEmpty();
  }
}


