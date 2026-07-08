import { BasePage } from "./BasePage";

export class SidebarPage extends BasePage {

    private async getSidebarLocator (key: string) {
        const xpath = `//div[@title = '${key}']`
        return this.page.locator(xpath);
    }


    async clickSidebarOption(key: string) {
        await this.click(await this.getSidebarLocator(key));
    }

    
}
