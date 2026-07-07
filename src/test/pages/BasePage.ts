import{Locator, Page} from "@playwright/test"

export class BasePage{
    constructor(protected page:Page){}

    async goto(url:string) {
        await this.page.goto(url);
    }

    async click(locator:Locator) {
        await locator.click();
    }

    async fill(locator:Locator, value:string) {
        await locator.fill(value);
    }

    async getText(locator:Locator):Promise<string> {
        return (await locator.textContent()) ?? "";
    }

    async check(locator:Locator) {
        await locator.check();
    }

    async isVisible(locator:Locator):Promise<boolean> {
        return await locator.isVisible();
    }

    async isEnabled(locator:Locator):Promise<boolean> {
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

}