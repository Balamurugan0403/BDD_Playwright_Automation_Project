import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, firefox, webkit } from '@playwright/test';
import { CustomWorld } from '../../main/support/CustomWorld';
import { LoginPage } from '../pages/LoginPage';
import { CourseStructurePage } from '../pages/CourseStructurePage';
import { CourseCategoryPage } from '../pages/CourseCategoryPage';
import { DynamicFieldManagementPage } from '../pages/DynamicFieldManagementPage';
import { config } from '../../main/config/config';
import { SidebarPage } from '../pages/SidebarPage';
import { ServiceModelPage } from '../pages/ServiceModelPage';
import { AddCoursePage } from '../pages/AddCoursePage';
import {SearchCoursePage} from '../pages/SearchCoursePage';

import { logger } from '../../main/utils/logger';

let browser: Browser;
BeforeAll(async () => {
    if (config.browser === "chromium")
    {
        logger.info("Launching chrome browser");
        browser = await chromium.launch({ headless: config.headless, slowMo: config.slowMo });
        logger.info("Chrome browser launched");
    }
    else if (config.browser === "firefox")
    {
        logger.info("Launching firefox browser");
        browser = await firefox.launch({ headless: config.headless, slowMo: config.slowMo });
        logger.info("Firefox browser launched");
    }
    else
    {
        logger.info("Launching safari browser");
        browser = await webkit.launch({ headless: config.headless, slowMo: config.slowMo });
        logger.info("Safari browser launched");
    }
});

Before(async function (this: CustomWorld, scenario) {
    this.browser = browser;
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.courseStructurePage = new CourseStructurePage(this.page);
    this.courseCategoryPage = new CourseCategoryPage(this.page);
    this.dynamicFieldManagementPage = new DynamicFieldManagementPage(this.page);
    this.addCoursePage = new AddCoursePage(this.page);
    this.sidebarPage = new SidebarPage(this.page);
    this.serviceModelPage = new ServiceModelPage(this.page)
    this.courseStructurePage = new CourseStructurePage(this.page);
    this.addCoursePage=new AddCoursePage(this.page);
    this.searchCoursePage=new SearchCoursePage(this.page);
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === "FAILED") {
        if (this.page) {
            await this.page.screenshot({ path: `reports/screenshots/${Date.now()}.png`, fullPage: true });
        }
    }
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
});

AfterAll(async () => {
    await browser.close();
});