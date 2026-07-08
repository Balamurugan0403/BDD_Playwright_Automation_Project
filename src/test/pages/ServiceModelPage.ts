import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class ServiceModelPage extends BasePage {

    private addServiceButton = this.page.getByRole("button", { name: "Add Service" });
    private serviceName = this.page.getByRole('textbox', { name: "e.g., 'Software Development'" })
    private serviceDescription = this.page.getByRole('textbox', { name: "Describe the service..." })
    private createService = this.page.getByRole('button', { name: "Create Service" })
    private successmessage = this.page.getByRole('heading', { name: 'Service Created Successfully' });

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

    async verifyCategoryCreated(expectedMessage: string) {
        await expect(this.successmessage).toContainText(expectedMessage,{ timeout: 10000 });
    }
}
