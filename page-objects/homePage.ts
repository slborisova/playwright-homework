import { Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validateHomePageTitle(){
    await expect(this.page.locator('.title')).toHaveText('Welcome to Petclinic');
  }
}