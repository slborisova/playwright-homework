import { Page, expect } from "@playwright/test";

export class OwnerAddPetPage {
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async fillInPetNameAndCheckIconBehavior(){
        const nameInputField = this.page.getByRole("textbox", { name: "name" });
        const nameIcon = this.page.locator("input#name + span");
        await expect(nameIcon).toHaveClass(/glyphicon-remove/);
        await nameInputField.fill("Tom");
        await expect(nameIcon).toHaveClass(/glyphicon-ok/);
    }

    async fillInBirthDateAndCheckDate(){
        const birthDateInputField = this.page.locator('[name="birthDate"]');
        await this.page.getByLabel("Open calendar").click();
        await this.page.getByRole("button", { name: "Choose month and year" }).click();
        await this.page.getByRole("button", { name: "Previous 24 years" }).click();
        await this.page.getByText("2014").click();
        await this.page.getByText("MAY").click();
        await this.page.getByText("2", { exact: true }).click();

        await expect(birthDateInputField).toHaveValue("2014/05/02");
    }

    async selectTypeOfPet(petType: string){
        const petTypeField = this.page.locator("#type");
        await petTypeField.selectOption(petType);
    }

    async savePet(){
        const saveButton = this.page.getByRole("button", { name: "Save Pet" });
        await saveButton.click();
    }
}