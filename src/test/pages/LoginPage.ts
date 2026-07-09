import { BasePage } from "./BasePage";
import loginData from "../../resources/data/loginData.json";
import { config } from "../../main/config/config";

export class LoginPage extends BasePage {

    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");



    async enterEmail() {
        await this.email.fill(loginData.validlogin.email);
    }

    async enterPassword() {
        await this.password.fill(loginData.validlogin.password);
    }

    async clickLoginButton() {

        await Promise.all([
            this.page.waitForLoadState("networkidle"),
            this.loginButton.click()
        ]);

    }

    async login() {
        await this.enterEmail();
        await this.enterPassword();
        await this.clickLoginButton();
    }
}
