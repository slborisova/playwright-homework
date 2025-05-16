export class CurrentDateHelper {
  readonly date: Date;
  constructor() {
    this.date = new Date();
  }

  getSelectedDate(){
    return this.date;
  }

  getCurrentYear(){
    return this.date.getFullYear();
  }

  getCurrentMonth(){
    return this.date.toLocaleString("en-US", { month: "2-digit" });
  }

  getCurrentDay(){
    return this.date.getDate().toString().padStart(2, "0");
  }
}