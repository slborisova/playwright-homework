import { Page, expect } from "@playwright/test";

export class OwnerInformationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addNewPet() {
    await expect(this.page.getByRole("heading").first()).toHaveText("Owner Information");
    await this.page.getByRole("button", { name: "Add New Pet" }).click();
  }

  async validateCreatedPet(petName: string, birthDate: string, petType: string) {
    const lastPetVisit = this.page.locator("table.table-striped").last().locator("tr td dd");
    await expect(lastPetVisit.first()).toHaveText(petName);
    await expect(lastPetVisit.nth(1)).toHaveText(birthDate);
    await expect(lastPetVisit.last()).toHaveText(petType);
  }

  async deletePet() {
    const deletePetButton = this.page.getByRole("button", { name: "Delete Pet" }).last();
    await deletePetButton.click();
  }

  async validateDeletedPet() {
    const lastPetVisit = this.page.locator("table.table-striped").last().locator("tr td dd");
    await expect(lastPetVisit.first()).toBeEmpty();
  }

  async addNewVisit() {
    await expect(this.page.getByRole("heading").first()).toHaveText("Owner Information");
    const lastPetVisit = this.page.locator("table.table-striped").last();
    const petsVisitsAddVisitButton = lastPetVisit.getByRole("button", {name: "Add Visit"});
    await petsVisitsAddVisitButton.click();
  }

  async validateCreatedVisitDate(dermatologistVisitDate: string) {
    const lastPetVisitSection = this.page.locator("table.table-condensed").last();
    const lastPetVisitCellDate = lastPetVisitSection.locator("tr td");
    await expect(lastPetVisitCellDate.first()).toHaveText(dermatologistVisitDate);
  }

  async firstTwoVisitDatesComparison() {
    const lastPetVisitSection = this.page.locator("table.table-condensed").last();
    const lastPetVisitRowDate = lastPetVisitSection.locator("tr");
    const firstDateText = await lastPetVisitRowDate.nth(1).locator("td").first().innerText();
    const secondDateText = await lastPetVisitRowDate.nth(2).locator("td").first().innerText();

    const firstDate = new Date(firstDateText.trim());
    const secondDate = new Date(secondDateText.trim());
    expect(secondDate.getTime()).toBeLessThan(firstDate.getTime());
  }

  async deleteVisitAndVerifyItDeleted(visitDescription: string) {
    const lastPetVisitSection = this.page.locator("table.table-condensed").last();
    await lastPetVisitSection.locator("tr").filter({ hasText: visitDescription }).getByRole("button", { name: "Delete Visit" }).click();
    await expect(lastPetVisitSection).not.toContainText(visitDescription);
  }

  async validateOwnerFullName(ownerFullName: string) {
    await expect(this.page.locator(".ownerFullName")).toHaveText(ownerFullName);
  }

  async editPet(petName: string) {
    const petSection = this.page.locator("app-pet-list").filter({ hasText: petName });
    await petSection.getByRole("button", { name: "Edit Pet" }).click();
  }

  async validatePetType(petType: string) {
    const petRosySection = this.page.locator("app-pet-list").filter({ hasText: "Rosy" });
    await expect(petRosySection.locator(".dl-horizontal dd").last()).toHaveText(petType);
  }

  async validateOwnerInformationHeader() {
    await expect(this.page.locator("h2").first()).toHaveText("Owner Information");
  }

  async validatePhoneNumberAndPetName(phoneNumber: string, petName: string) {
    await expect(this.page.getByRole("row", { name: "Telephone" }).getByRole("cell").last()).toHaveText(phoneNumber);

    await expect(this.page.locator("table.table-striped").last().locator("tr td dd").first()).toHaveText(petName);
  }
}
