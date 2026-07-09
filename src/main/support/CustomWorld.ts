import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";
import { CourseCategoryPage } from "../../test/pages/CourseCategoryPage";
import { DynamicFieldManagementPage } from "../../test/pages/DynamicFieldManagementPage";
<<<<<<< HEAD
import { SidebarPage } from "../../test/pages/SidebarPage";
import { ServiceModelPage } from "../../test/pages/ServiceModelPage";
import { CourseStructurePage } from "../../test/pages/CourseStructurePage";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { AddCoursePage } from "../../test/pages/AddCoursePage";
import { Service } from "../types/Service";

export class CustomWorld extends World{
=======
export class CustomWorld {
>>>>>>> 323b9dd (CourseCategory feature Created)
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;
    courseCategoryPage!:CourseCategoryPage;
    dynamicFieldManagementPage!: DynamicFieldManagementPage;
<<<<<<< HEAD
    sidebarPage!: SidebarPage;
    serviceModelPage!: ServiceModelPage; 
    courseStructurePage!: CourseStructurePage;
    addCoursePage!:AddCoursePage;
    service!: Service
}
=======
>>>>>>> 323b9dd (CourseCategory feature Created)

setWorldConstructor(CustomWorld);
