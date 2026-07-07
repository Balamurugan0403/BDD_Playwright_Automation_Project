import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
export class CustomWorld {
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;
    courseCategoryPage!:CourseCategoryPage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;

}