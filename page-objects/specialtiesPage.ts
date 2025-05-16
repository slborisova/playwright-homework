import { Page, expect } from "@playwright/test";

export class SpecialtiesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async editSpecialty(specialtyName: string) {
    await this.page.getByRole("row", { name: specialtyName }).getByRole("button", { name: "Edit" }).click();
  }

  async validateUpdatedSpecialtyName(specialtyName: string) {
    expect(this.page.getByRole("row", { name: specialtyName }));
  }

  async addNewSpecialty(specialtyName: string) {
    await this.page.getByRole("button", { name: "Add" }).click();
    await this.page.locator("#name").fill(specialtyName);

    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForResponse((response) =>
      response.url().includes(`api/specialties`)
    );
  }

  async getAllSpecialties(): Promise<string[]> {
    const specialties: string[] = [];
    const specialtyRows = this.page.locator("tbody tr input");

    for (let specialty of await specialtyRows.all()) {
      const specialtyName = await specialty.inputValue();
      specialties.push(specialtyName!);
    }
    return specialties;
  }

  async deleteLastSpecialty() {
    await this.page.getByRole("button", { name: "Delete" }).last().click();
    await this.page.waitForResponse((response) =>
      response.url().includes(`api/specialties`)
    );
  }
}
