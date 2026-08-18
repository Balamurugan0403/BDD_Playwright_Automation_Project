import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class ServiceModelPage extends BasePage {

    private addServiceButton = this.page.getByRole("button", { name: "Add Service" });
    private serviceName = this.page.locator("//input[@placeholder = \"e.g., 'Software Development'\"]");
    private serviceDescription = this.page.locator("//textarea[@placeholder = 'Describe the service...']");
    private modelName = this.page.locator("//input[@placeholder = \"e.g., 'Frontend Development'\"]");
    private modelDescription = this.page.locator("//textarea[@placeholder = 'Describe the model...']");
    private searchInput = this.page.getByPlaceholder("Search services...");
    private serviceNotFoundMessage = this.page.locator("//td[text() = 'No services found ']");
    private createService = this.page.getByRole("button", { name: "Create Service" });
    private createModelButton = this.page.getByRole("button", { name: "Create Modal" });
    private AddModelButton = this.page.getByRole("button", { name: "Add Modal" });
    private clickToAddButton = this.page.locator("//div[contains(text() , 'Click to')]");           
    private successMessage = this.page.getByRole("alert").filter({ hasText: "Service created successfully" });
    private errorMessage = this.page.getByRole("alert").filter({ hasText: "Request failed with status code 400" });
    private serviceNames = this.page.locator("//table/tbody/tr/td[2]/div/div[2]/div[1]");

    async clickAddService() {
        try {
            logger.info("Clicking 'Add Service' button.");

            await this.click(this.addServiceButton);

            logger.info("'Add Service' button clicked successfully.");
        } catch (error) {
            logger.error(`Failed to click 'Add Service' button: ${error}`);
            throw error;
        }
    }

    async enterServiceName(name: string) {
        try {
            logger.info(`Entering service name: ${name}`);

            await this.fill(this.serviceName, name);

            logger.info("Service name entered successfully.");
        } catch (error) {
            logger.error(`Failed to enter service name: ${error}`);
            throw error;
        }
    }

    async enterServiceDescription(description: string) {
        try {
            logger.info("Entering service description.");

            await this.fill(this.serviceDescription, description);

            logger.info("Service description entered successfully.");
        } catch (error) {
            logger.error(`Failed to enter service description: ${error}`);
            throw error;
        }
    }

    async clickCreateService() {
        try {
            logger.info("Clicking 'Create Service' button.");

            await this.click(this.createService);

            logger.info("'Create Service' button clicked successfully.");
        } catch (error) {
            logger.error(`Failed to click 'Create Service' button: ${error}`);
            throw error;
        }
    }

    async verifyServiceCreated(expectedMessage: string) {
        try {
            logger.info(`Verifying success message: ${expectedMessage}`);

            await expect(this.successMessage).toContainText(expectedMessage, {
                timeout: 10000
            });

            logger.info("Service created successfully.");
        } catch (error) {
            logger.error(`Service creation verification failed: ${error}`);
            throw error;
        }
    }

    async verifyErrorMessageDisplayed(expectedMessage: string) {
        try {
            logger.info(`Verifying error message: ${expectedMessage}`);

            await expect(this.errorMessage).toContainText(expectedMessage, {
                timeout: 10000
            });

            logger.info("Error message verified successfully.");
        } catch (error) {
            logger.error(`Error message verification failed: ${error}`);
            throw error;
        }
    }

    async verifyValidity() {
        try {
            logger.info("Checking service form validation.");

            const isNameValid = await this.serviceName.evaluate(
                (el: HTMLInputElement) => el.validity.valid
            );

            const isDescriptionValid = await this.serviceDescription.evaluate(
                (el: HTMLTextAreaElement) => el.validity.valid
            );

            logger.info(
                `Validation Result -> Name: ${isNameValid}, Description: ${isDescriptionValid}`
            );

            return {
                isNameValid,
                isDescriptionValid
            };
        } catch (error) {
            logger.error(`Validation check failed: ${error}`);
            throw error;
        }
    }

    async enterServiceKey(key: string) {
        try {
            logger.info(`Searching service with keyword: ${key}`);

            await this.fill(this.searchInput, key);

            logger.info("Search keyword entered successfully.");
        } catch (error) {
            logger.error(`Failed to enter search keyword: ${error}`);
            throw error;
        }
    }

    async verifyFoundMessage(expectedMessage: string) {
        try {
            logger.info("Verifying 'No services found' message.");

            const actualMessage = await this.getText(this.serviceNotFoundMessage);

            const status = actualMessage === expectedMessage;

            logger.info(`Message verification result: ${status}`);

            return status;
        } catch (error) {
            logger.error(`Failed to verify 'No services found' message: ${error}`);
            throw error;
        }
    }

    async verifySearchResults(key: string) {
        try {
            logger.info(`Verifying search results for keyword: ${key}`);

            const serviceNameLocators = await this.serviceNames.all();

            for (const serviceNameLocator of serviceNameLocators) {

                const serviceName = (await serviceNameLocator.textContent())?.trim() ?? "";

                logger.info(`Found service: ${serviceName}`);

                if (!serviceName.toLowerCase().includes(key.toLowerCase())) {
                    logger.warn(
                        `Search verification failed. '${serviceName}' does not contain '${key}'.`
                    );
                    return false;
                }
            }

            logger.info("All displayed services match the search keyword.");
            return true;
        } catch (error) {
            logger.error(`Search result verification failed: ${error}`);
            throw error;
        }
    }

    async addService(name: string, description: string) {
        await this.clickAddService();
        await this.enterServiceName(name);
        await this.enterServiceDescription(description);
        await this.clickCreateService();
    }
}