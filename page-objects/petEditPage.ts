import { Page, expect } from "@playwright/test";

export class PetEditPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async checkPetHeaderExists() {
    await expect(this.page.locator("h2")).toHaveText("Pet");
  }

  async validateOwnerName(ownerName: string) {
    await expect(this.page.locator("#owner_name")).toHaveValue(ownerName);
  }

  async validatePetType(petType: string) {
    const petTypeInputField = this.page.locator("#type1");
    await expect(petTypeInputField).toHaveValue(petType);
  }

  async validateTypesList() {
    const petTypeDropdownMenu = this.page.locator("#type");
    await petTypeDropdownMenu.click();
    const typeList = await this.page.locator("#type option");
    const types = ["cat", "dog", "lizard", "snake", "animal"];
    await expect(typeList).toHaveText(types);
  }

  async selectAndValidateSelectedType() {
    const types = ["cat", "dog", "lizard", "snake", "animal"];
    const petTypeDropdownMenu = await this.page.locator("#type");
    const petTypeInputField = await this.page.locator("#type1");
    for (const type of types) {
      await petTypeDropdownMenu.selectOption(type);
      await expect(petTypeInputField).toHaveValue(type);
    }
  }

  async selectPetType(petType: string){
    const petTypeInputField = this.page.locator("#type1");
    const petTypeDropdownMenu = this.page.locator("#type");

    await petTypeDropdownMenu.selectOption(petType);
    await expect(petTypeInputField).toHaveValue(petType);
    await expect(petTypeDropdownMenu).toHaveValue(petType);
  }

  async updatePet(){
    await this.page.getByRole("button", { name: "Update Pet" }).click();
  }
}
