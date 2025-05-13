import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { EditPetTypePage } from "./editPetTypePage";
import { EditSpecialtyPage } from "./editSpecialtyPage";
import { EditVeterinarianPage } from "./editVeterinarianPage";
import { HomePage } from "./homePage";
import { OwnerInformationPage } from "./ownerInformationPage";
import { OwnerAddPetPage } from "./ownersAddPetPage";
import { OwnersPage } from "./ownersPage";
import { PetAddVisitPage } from "./petAddVisitPage";
import { PetEditPage } from "./petEditPage";
import { PetTypesPage } from "./petTypesPage";
import { SpecialtiesPage } from "./specialtiesPage";
import { VeterinariansPage } from "./veterinariansPage"

export class PageManager{

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly editPetTypePage: EditPetTypePage;
    private readonly editSpecialtyPage: EditSpecialtyPage;
    private readonly editVeterinarianPage: EditVeterinarianPage;
    private readonly homePage: HomePage;
    private readonly ownerInformationPage: OwnerInformationPage;
    private readonly ownersAddPetPage: OwnerAddPetPage;
    private readonly ownersPage: OwnersPage;
    private readonly petAddVisitPage: PetAddVisitPage;
    private readonly petEditPage: PetEditPage;
    private readonly petTypesPage: PetTypesPage;
    private readonly specialtiesPage: SpecialtiesPage;
    private readonly veterinariansPage: VeterinariansPage;

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.editPetTypePage = new EditPetTypePage(this.page);
        this.editSpecialtyPage = new EditSpecialtyPage(this.page);
        this.editVeterinarianPage = new EditVeterinarianPage(this.page);
        this.homePage = new HomePage(this.page);
        this.ownerInformationPage = new OwnerInformationPage(this.page);
        this.ownersAddPetPage = new OwnerAddPetPage(this.page);
        this.ownersPage = new OwnersPage(this.page);
        this.petAddVisitPage = new PetAddVisitPage(this.page);
        this.petEditPage = new PetEditPage(this.page);
        this.petTypesPage = new PetTypesPage(this.page);
        this.specialtiesPage = new SpecialtiesPage(this.page);
        this.veterinariansPage = new VeterinariansPage(this.page);
    }

    getNavigationPage(){
        return this.navigationPage;
    }

    getEditPetTypePage(){
        return this.editPetTypePage;
    }
    getEditSpecialtyPage(){
        return this.editSpecialtyPage;
    }
    getEditVeterinarianPage(){
        return this.editVeterinarianPage;
    }
    getHomePage(){
        return this.homePage;
    }
    getOwnerInformationPage(){
        return this.ownerInformationPage;
    }
    getOwnerAddPetPage(){
        return this.ownersAddPetPage;
    }
    getOwnersPage(){
        return this.ownersPage;
    }
    getPetAddVisitPage(){
        return this.petAddVisitPage;
    }
    getPetEditPage(){
        return this.petEditPage;
    }
    getPetTypesPage(){
        return this.petTypesPage;
    }
    getSpecialtiesPage(){
        return this.specialtiesPage;
    }
    getVeterinariansPage(){
        return this.veterinariansPage;
    }

}