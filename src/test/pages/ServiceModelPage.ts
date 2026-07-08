import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class ServiceModelPage extends BasePage {

    private addServiceButton = this.page.getByRole("button", { name: "Add Service" });
    private serviceName = this.page.locator("//input[@placeholder = \"e.g., 'Software Development'\"]")
    private serviceDescription = this.page.locator("//textarea[@placeholder = 'Describe the service...']")
    private createService = this.page.getByRole('button', { name: "Create Service" })
    private successMessage = this.page.getByRole("alert").filter({ hasText: "Service created successfully" });
    private errorMessage = this.page.getByRole("alert").filter({ hasText: "Request failed with status code 400" });
    

    async clickAddService() {
        await this.click(this.addServiceButton);
    }

    async enterServiceName(name: string) {
        await this.fill(this.serviceName, name);
    }

    async enterServiceDescription(description: string) {
        await this.fill(this.serviceDescription, description);
    }

    async clickCreateService() {
        await this.click(this.createService);
    }

    async verifyServiceCreated(expectedMessage: string) {
        await expect(this.successMessage).toContainText(expectedMessage,{ timeout: 10000 });
    }

    async verifyErrorMessageDisplayed(expectedMessage: string) {
        await expect(this.errorMessage).toContainText(expectedMessage,{ timeout: 10000 });
    }

    async verifyValidity() {
        const isNameValid = await this.serviceName.evaluate(
            (el: HTMLInputElement) => el.validity.valid
        );

        const isDescriptionValid = await this.serviceDescription.evaluate(
            (el: HTMLTextAreaElement) => el.validity.valid
        );

        return {
            isNameValid,
            isDescriptionValid
        };
    }
    
}
