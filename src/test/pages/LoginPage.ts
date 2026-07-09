import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");

    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL!);
        await expect(this.email).toBeVisible();
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async enterCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    // Keep this method because other step files use it
    async login(email: string, password: string) {
        await this.enterCredentials(email, password);
        await this.clickLoginButton();
    }

    async clickLoginButton() {

        await expect(this.loginButton).toBeEnabled();

        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes("login") &&
                response.request().method() === "POST"
            ),
            this.loginButton.click()
        ]);

    }

    async verifyToastMessage(expectedMessage: string) {

        const toast = this.page.getByText(expectedMessage, {
            exact: false
        });

        await expect(toast).toBeVisible({
            timeout: 10000
        });

        await expect(toast).toContainText(expectedMessage);

    }

    async getToastMessage(): Promise<string> {

        const toast = this.page.getByText(/.+/).filter({
            has: this.page.locator("div[role='status']")
        });

        return (await toast.textContent())?.trim() || "";

    }
}