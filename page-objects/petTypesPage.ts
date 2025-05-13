import { Page, expect } from "@playwright/test";

export class PetTypesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("/");
    await this.page.getByTitle("pettypes").click();
    await expect(this.page.locator("h2")).toHaveText("Pet Types");
  }

  async activateAddNewPetType() {
    await this.page.getByRole("button", { name: "Add" }).click();
    const nameInputField = this.page.locator("#name");
    await expect(nameInputField).toBeVisible();
  }

  async fillNewPetType(petTypeName: string) {
    const nameInputField = this.page.locator("#name");
    await nameInputField.fill(petTypeName);
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async verifyNewPetTypeAdded(petTypeName: string) {
    const petTypesTableLastInputField = this.page.locator("table tr td input").last();
    await expect(petTypesTableLastInputField).toHaveValue(petTypeName);
  }

  async deleteLastPetType() {
    this.page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Delete the pet type?");
      dialog.accept();
    });

    await this.page.locator("table tr").last().getByRole("button", { name: "Delete" }).click();

    await this.page.waitForResponse((response) =>
      response.url().includes(`api/pettypes`)
    );
  }

  async validateDeletedPetType(petTypeName: string) {
    const petTypesTableLastInputField = this.page.locator("table tr td input").last();
    await expect(petTypesTableLastInputField).not.toHaveValue(petTypeName);
  }

  async editFirstPetType(){
    const editButton = this.page.getByRole("button", { name: "Edit" });
    await editButton.first().click();
  }

  async validateFirstPetType(petName: string){
    await expect(this.page.locator('[id="0"]')).toHaveValue(petName);
  }

  async editSecondPetType(){
    await this.page.getByRole("button", { name: "Edit" }).nth(1).click();
  }

  async validateSecondPetType(petName: string){
    await expect(this.page.locator('[id="1"]')).toHaveValue(petName);
  }

  async editThirdPetType(){
    await this.page.getByRole("button", { name: "Edit" }).nth(2).click();
  }

  async validatePetTypesHeader(){
    await expect(this.page.locator("h2")).toHaveText("Pet Types");
  }
}
