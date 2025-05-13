import { Page, expect } from "@playwright/test";

export class EditVeterinarianPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async validateSpecialtiesList(specialties: string[]){
    await this.page.locator(".dropdown-arrow").click();

    const allBoxes = await this.page.locator(".dropdown-content div").allTextContents();

    expect(allBoxes).toEqual(specialties);
  }

  async changeVeterinarianSpecialty(specialtyName: string){
    await this.page.getByRole("checkbox", { name: specialtyName }).check();
    await this.page.getByRole("checkbox", { name: "New specialty" }).uncheck();
    await this.page.locator(".dropdown-arrow").click();
    await this.page.getByRole("button", { name: "Save Vet" }).click();
  }

  async selectSpecialty(specialtyName: string){
    await this.page.locator('.dropdown-display').click();
    await this.page.getByRole('checkbox', {name: specialtyName}).check()
  }
  async validateSelectedSpecialty(specialtyName: string){
    const specialtiesInputField = this.page.locator(".selected-specialties");
    await expect(specialtiesInputField).toHaveText(specialtyName);
  }

  async openDropDownMenu(){
    await this.page.locator(".dropdown-arrow").click();
  }

  async specialtyDropDownMenuIsTrue(specialtyName: string){
    expect(await this.page.getByRole("checkbox", { name: specialtyName }).isChecked()).toBeTruthy();
  }

  async specialtyDropDownMenuIsFalse(specialtyName: string){
    expect(await this.page.getByRole("checkbox", { name: specialtyName }).isChecked()).toBeFalsy();
  }

  async checkDropDownSpecialty(specialtyName: string){
    await this.page.getByRole("checkbox", { name: specialtyName }).check();
  }

  async uncheckDropDownSpecialty(specialtyName: string){
    await this.page.getByRole("checkbox", { name: specialtyName }).uncheck();
  }

  async selectAllBoxes(){
    const allBoxes = this.page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.check();
      expect(await box.isChecked()).toBeTruthy();
    }
  }

  async unselectAllBoxes(){
    const allBoxes = this.page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.uncheck();
      expect(await box.isChecked()).toBeFalsy();
    }
  }
  async validateUnSelectedSpecialty(){
    const specialtiesInputField = this.page.locator(".selected-specialties");
    await expect(specialtiesInputField).toBeEmpty();
  }
}