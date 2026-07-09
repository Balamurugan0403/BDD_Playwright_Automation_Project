import{Before, After, BeforeAll, AfterAll} from '@cucumber/cucumber';
import { chromium, Browser, firefox, webkit } from '@playwright/test';
import {CustomWorld} from '../../main/support/CustomWorld';
import { LoginPage } from '../pages/LoginPage';
import { CourseCategoryPage } from '../pages/CourseCategoryPage';
import { DynamicFieldManagementPage } from '../pages/DynamicFieldManagementPage';
<<<<<<< HEAD
import { config } from '../../main/config/config';
import { SidebarPage } from '../pages/SidebarPage';
import { ServiceModelPage } from '../pages/ServiceModelPage';
import { CourseStructurePage } from '../pages/CourseStructurePage';
import { AddCoursePage } from '../pages/AddCoursePage';
=======
>>>>>>> 323b9dd (CourseCategory feature Created)

let browser: Browser;
BeforeAll(async () =>{
    if(config.browser === "chromium") 
        browser = await chromium.launch({headless:config.headless});
    else if(config.browser === "firefox") 
        browser = await firefox.launch({headless:config.headless});
    else 
        browser = await webkit.launch({headless:config.headless});
});


Before(async function (this: CustomWorld, scenario) {
    this.browser = browser;
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.courseCategoryPage = new CourseCategoryPage(this.page);
    this.dynamicFieldManagementPage = new DynamicFieldManagementPage(this.page);
<<<<<<< HEAD
    this.sidebarPage = new SidebarPage(this.page);
    this.serviceModelPage = new ServiceModelPage(this.page)
    this.courseStructurePage = new CourseStructurePage(this.page);
    this.addCoursePage=new AddCoursePage(this.page);
=======
>>>>>>> 323b9dd (CourseCategory feature Created)
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === "FAILED") {
        if (this.page) {
            await this.page.screenshot({path: `reports/screenshots/${Date.now()}.png`,fullPage: true});
        }
    }
    if (this.page){
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
});

AfterAll(async()=>{
    await browser.close();
});