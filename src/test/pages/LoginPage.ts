import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");



    async enterEmail() {
        await this.email.fill(loginData.validlogin.email);
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
<<<<<<< HEAD

        await Promise.all([
            this.page.waitForLoadState("networkidle"),
            this.loginButton.click()
        ]);

=======
        await this.loginButton.click();
>>>>>>> 08a1ccb489e32c6b74e50ad33bd42aac8d10e783
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