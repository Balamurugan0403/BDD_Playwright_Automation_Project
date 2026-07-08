import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
import { CourseStructurePage } from "../../test/pages/CourseStructurePage";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
import { AddCoursePage } from "../../test/pages/AddCoursePage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { ServiceModelPage } from "../../test/pages/ServiceModelPage";
import { Service } from "../types/Service";

export class CustomWorld extends World{
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;
    courseCategoryPage!:CourseCategoryPage;
    courseStructurePage!: CourseStructurePage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;
    addCoursePage!: AddCoursePage;
    sidebarPage!: SidebarPage;
    serviceModelPage!: ServiceModelPage;
    service!: Service
}

setWorldConstructor(CustomWorld);
