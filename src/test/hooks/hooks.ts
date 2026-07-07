import{Before, After, BeforeAll, AfterAll} from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import {CustomWorld} from '../../main/support/CustomWorld';
import { LoginPage } from '../pages/LoginPage';
import { CourseCategoryPage } from '../pages/CourseCategoryPage';
import { DynamicFieldManagementPage } from '../pages/DynamicFieldManagementPage';

let browser: Browser;
BeforeAll(async () =>{
    browser=await chromium.launch({headless:false});
});


Before(async function (this: CustomWorld, scenario) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.courseCategoryPage = new CourseCategoryPage(this.page);
    this.dynamicFieldManagementPage = new DynamicFieldManagementPage(this.page);
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