import { Page, expect } from "@playwright/test";

export class EditSpecialtyPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validateEditSpecialtyHeader() {
    await expect(this.page.locator("h2")).toHaveText("Edit Specialty");
  }

  async updateSpecialtyName(specialtyName: string) {
    const specialtyNameInputField = this.page.getByRole("textbox");
    await specialtyNameInputField.click();
    await specialtyNameInputField.clear();
    await specialtyNameInputField.fill(specialtyName);
    await this.page.getByRole("button", { name: "Update" }).click();
    await this.page.waitForResponse((response) =>
      response.url().includes(`api/specialties`)
    );
  }
}
