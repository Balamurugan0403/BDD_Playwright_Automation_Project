import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
<<<<<<< HEAD
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { ServiceModelPage } from "../../test/pages/ServiceModelPage";
import { World, setWorldConstructor } from "@cucumber/cucumber";

export class CustomWorld extends World {

=======
import { CourseStructurePage } from "../../test/pages/CourseStructurePage";
import { World, setWorldConstructor } from "@cucumber/cucumber";

export class CustomWorld extends World {
>>>>>>> aa5614b (Configuration updated)
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

setWorldConstructor(CustomWorld);
=======
    courseStructurePage!: CourseStructurePage;
}

setWorldConstructor(CustomWorld);
>>>>>>> aa5614b (Configuration updated)
