import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
<<<<<<< HEAD
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { ServiceModelPage } from "../../test/pages/ServiceModelPage";
import { World, setWorldConstructor } from "@cucumber/cucumber";
=======
>>>>>>> 3c7094c (login feature added)

export class CustomWorld extends World {
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;
<<<<<<< HEAD
    courseCategoryPage!:CourseCategoryPage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;
    sidebarPage!: SidebarPage;
    serviceModelPage!: ServiceModelPage; 
}
=======
>>>>>>> 3c7094c (login feature added)

setWorldConstructor(CustomWorld);
