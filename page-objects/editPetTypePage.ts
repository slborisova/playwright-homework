import { Page, expect } from "@playwright/test";

export class EditPetTypePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validateEditPetTypeHeader(){
    await expect(this.page.locator("h2")).toHaveText("Edit Pet Type");
  }

  async fillPetTypeBox(petName: string){
    const editPetTypeInputField = this.page.getByRole("textbox");
    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();
    await editPetTypeInputField.fill(petName);
  }

  async updatePetType(){
    const updateButton = this.page.getByRole("button", { name: "Update" });
    await updateButton.click();
    await this.page.waitForResponse((response) =>
      response.url().includes(`api/pettypes`)
    );
  }

  async validatePetType(petName: string){
    const editPetTypeInputField = this.page.getByRole("textbox");
    await expect(editPetTypeInputField).toHaveValue(petName);
  }

  async cancelPetType(){
    await this.page.getByRole("button", { name: "Cancel" }).click();
  }

  
  async clearPetTypeField(){
    const editPetTypeInputField = this.page.getByRole("textbox");
    await editPetTypeInputField.click();
    await editPetTypeInputField.clear();
  }

  async nameRequiredMessage(){
    await expect(this.page.locator('.help-block')).toHaveText( "Name is required");
  }
}