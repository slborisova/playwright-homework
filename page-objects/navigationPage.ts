import { Page, expect } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openHomePage(){
        await this.page.goto('/')
    }

    async openOwnersPage() {
        await this.page.goto("/");
        await this.page.getByText("Owners").click();
        await this.page.getByText("Search").click();
        await expect(this.page.locator("h2")).toHaveText("Owners");
    }

    async openVeterinariansPage() {
        await this.page.goto("/");
        await this.page.getByText("Veterinarians").click();
        await this.page.getByText("All").click();
        await expect(this.page.locator("h2")).toHaveText("Veterinarians");
    }

    async openPetTypesPage() {
        await this.page.goto("/");
        await this.page.getByTitle("pettypes").click();
        await expect(this.page.locator("h2")).toHaveText("Pet Types");
    }

    async openSpecialtiesPage() {
        await this.page.goto("/");
        await this.page.getByRole("link", { name: "Specialties" }).click();
        await expect(this.page.locator("h2")).toHaveText("Specialties");
    }

}