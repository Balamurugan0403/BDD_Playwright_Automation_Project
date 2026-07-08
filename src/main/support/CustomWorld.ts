import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { ServiceModelPage } from "../../test/pages/ServiceModelPage";

export class CustomWorld {
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;
    courseCategoryPage!:CourseCategoryPage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;
    sidebarPage!: SidebarPage;
    serviceModelPage!: ServiceModelPage; 
}