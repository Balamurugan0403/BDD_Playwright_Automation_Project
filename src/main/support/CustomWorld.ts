import { BrowserContext, Browser, Page } from "@playwright/test";
import { LoginPage } from "../../test/pages/LoginPage";

export class CustomWorld {
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    loginPage!:LoginPage;

}