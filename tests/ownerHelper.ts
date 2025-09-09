import { faker } from "@faker-js/faker";
export class OwnerHelper {
    constructor() {
   
    }
    getFirstName(){
        return faker.person.firstName();
    };

    getLastName(){
        return faker.person.lastName();
    }
    getStreetAddress(){
        return faker.location.streetAddress();
    }
    getPhoneNumber(){
        return faker.phone.number();
    }
}