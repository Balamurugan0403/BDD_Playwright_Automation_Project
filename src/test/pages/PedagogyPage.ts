import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class PedagogyPage extends BasePage {
    private pedagogyviewelements=this.page.locator("//div[@class='space-y-4']/descendant::span[4]");
    private addElementBtn=this.page.getByRole("button", { name:"Add Element" });
    private elementNameInput=this.page.getByRole('textbox', { name: /e\.g\., 'Think-Pair-Share'/i })
    private createElementBtn=this.page.getByRole('button', { name: 'Create Element' })
    private nextpagebutton=this.page.locator("//span[contains(@class, 'text-gray-600')]/following-sibling::button");
    private listelements = this.page.locator("//div[@class='font-medium text-gray-900']");
    private updatebutton=this.page.locator("//div[@class='flex justify-end space-x-3 pt-4']//button[text()='Update Element']");
    private deleteconfirmationbutton=this.page.locator("//button[text()='Delete']");
    private deletedelement=this.page.locator("//tbody[@class='bg-white divide-y divide-gray-200']/descendant::div[1]");
    private searchbar=this.page.getByPlaceholder("Search activities...");
    private searchResult = this.page.locator("//div[@class='text-xs text-gray-400']/preceding-sibling::div[@class='font-medium text-gray-900 text-xs']");


    async clickPedagogyViewElements() {
        logger.info("Clicking View Elements.");
        await this.click(this.pedagogyviewelements);
    }

    async clickAddElementButton() {
        logger.info("Clicking Add Element button.");
        await this.click(this.addElementBtn);
    }

    async enterElementName(elementName: string) {
        logger.info(`Entering element name: ${elementName}`);
        await this.fill(this.elementNameInput, elementName);
    }

    async editElementName(elementname: string) {
        logger.info(`Updating element name to: ${elementname}`);
        await this.fill(this.elementNameInput, "");
        await this.fill(this.elementNameInput, elementname);
    }

    async clickCreateElementButton() {
        logger.info("Clicking Create Element button.");
        await this.click(this.createElementBtn);
        await this.page.waitForLoadState("networkidle");
    }

    async clickNextPageButton() {
        logger.info("Navigating to the next page.");
        await this.clickUntilDisabled(this.nextpagebutton);
    }

    async getElementNamesFromPage(): Promise<string[]> {
        logger.info("Fetching element names from the current page.");
        return await this.getAllText(this.listelements);
    }

    async clickEditButton(index: number) {
        logger.info(`Clicking Edit button for element at index ${index}.`);
        const editbutton = this.page
            .locator("//tbody[@class='bg-white divide-y divide-gray-200']/descendant::button[@title='Edit Element']")
            .nth(index);
        await this.click(editbutton);
    }

    async clickUpdateElementButton() {
        logger.info("Clicking Update Element button.");
        await this.click(this.updatebutton);
    }

    async clickDeletesvgButton(index: number) {
        logger.info(`Clicking Delete button for element at index ${index}.`);
        const deleteButton = this.page
            .locator("(//tbody[@class='bg-white divide-y divide-gray-200']//button[@title='Delete Element'])")
            .nth(index);
        await deleteButton.click();
    }

    async clickDeleteConfirmationButton() {
        logger.info("Confirming element deletion.");
        await this.click(this.deleteconfirmationbutton);
    }

    async getDeletedElementFromPage() {
        logger.info("Retrieving deleted element name.");
        return await this.getText(this.deletedelement);
    }

    async searchPedagogyActivity(data: string) {
        logger.info(`Searching pedagogy activity: ${data}`);
        await this.fill(this.searchbar, data);
    }

    async getSearchResult(): Promise<string> {
    logger.info("Fetching search result.");
    return (await this.getText(this.searchResult)) ?? "";
}
}