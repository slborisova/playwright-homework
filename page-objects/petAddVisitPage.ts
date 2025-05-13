import { Page, expect } from "@playwright/test";

export class PetAddVisitPage {
    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }

    async validateNewVisitPageOpened(){
        await expect(this.page.getByRole("heading")).toHaveText("New Visit");
    }

    async validatePetNameAndOwnerName(petName: string, ownerName: string){
        const newVisitPetTable = this.page.locator("table.table-striped").locator("tr td");
        await expect(newVisitPetTable.first()).toHaveText(petName);
        await expect(newVisitPetTable.last()).toHaveText(ownerName);
    }

    async fillInAndValidateVisitDate(currentYear: number, currentMonth: string, currentDay: string){
        const calendarIcon = this.page.getByLabel("Open calendar");
        await calendarIcon.click();
        const calendarTodayCell = this.page.locator(".mat-calendar-body-today");
        await calendarTodayCell.click();

        const currentDate = `${currentYear}/${currentMonth}/${currentDay}`;
        const dateInputField = this.page.locator('[name="date"]');
        await expect(dateInputField).toHaveValue(currentDate);
    }

    async fillInDescriptionInputField(visitDescription: string){
        const descriptionInputField = this.page.locator("#description");
        await descriptionInputField.fill(visitDescription);
    }

    async addVisit(){
        const newVisitAddVisitButton = this.page.getByRole("button", {name: "Add Visit"});
        await newVisitAddVisitButton.click();
    }

    async fillInLastVisitDateAndValidate(date: Date){
        const calendarIcon = this.page.getByLabel("Open calendar");
        await calendarIcon.click();
        date.setDate(date.getDate() - 45);
        const expectedYear = date.getFullYear();
        const expectedMonth = date.toLocaleString('En-US', {month: "2-digit"});
        const expectedDay = date.getDate().toString();
        const expectedDate = `${expectedYear}/${expectedMonth}/${expectedDay}`;
        let calendarMonthAndYear = await this.page.getByLabel("Choose month and year").textContent();
        const expectedMonthAndYear = `${expectedMonth} ${expectedYear}`;
        while(!calendarMonthAndYear?.includes(expectedMonthAndYear)){
            await this.page.getByLabel("Previous month").click()
            calendarMonthAndYear = await this.page.getByLabel("Choose month and year").textContent();
        }

        await this.page.locator('[class="mat-calendar-body"]').getByText(expectedDay, {exact: true}).click();
        const dateInputField = this.page.locator('[name="date"]');
        await expect(dateInputField).toHaveValue(expectedDate);

    }
}
