import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
import { CourseStructurePage } from "../../test/pages/CourseStructurePage";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";

export class CustomWorld extends World{
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    
    loginPage!:LoginPage;
    courseStructurePage!: CourseStructurePage;

    courseCategoryPage!:CourseCategoryPage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;
}

setWorldConstructor(CustomWorld);