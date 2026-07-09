import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");

    async navigate() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    // Reusable method for complete valid login
    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    // Reusable method to only enter credentials
    async enterCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }
}