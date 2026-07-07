import { BrowserContext, Browser, Page } from "@playwright/test";

export class CustomWorld {
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;

    loginPage!:LoginPage;
    registerPage!:RegisterPage;
    log=logger;
}