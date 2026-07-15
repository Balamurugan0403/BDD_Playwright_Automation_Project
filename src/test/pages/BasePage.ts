import{Locator, Page} from "@playwright/test"
import { config } from "../../main/config/config";

export class BasePage{
    constructor(protected page:Page){}

    async navigate() {
        await this.page.goto(config.baseUrl);
    }

    async goto(url:string) {
        await this.page.goto(url);
    }

    async click(locator:Locator) {
        await locator.click();
    }

    async fill(locator:Locator, value:string) {
        await locator.fill(value);
    }

    async getText(locator:Locator) {
        return await locator.textContent();
    }

    async check(locator:Locator) {
        await locator.check();
    }

    async isVisible(locator:Locator){
        return await locator.isVisible();
    }

    async isEnabled(locator:Locator) {
        return await locator.isEnabled();
    }

    async scrollIntoView(locator:Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async selectOption(locator:Locator, value:string) {
        await locator.selectOption(value);
    }

    async uncheck(locator:Locator) {
        await locator.uncheck();
    }

     async getAllText(locator: Locator): Promise<string[]> {
        try {
            return await locator.allInnerTexts();
        } catch (error) {
            throw error;
        }
    }

     async clickUntilDisabled(nextButtonLocator: Locator): Promise<void> {
        try {
            let pageCount = 1;
            while (true) {
                const isDisabled = await nextButtonLocator.getAttribute('disabled');
                if (isDisabled !== null) {
                    break;
                }
                await this.click(nextButtonLocator);
                pageCount++;
            }
        } catch (error) {
            throw error;
        }
    }

}