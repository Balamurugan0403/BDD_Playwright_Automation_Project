import { BasePage } from "./BasePage";
import loginData from "../../resources/data/loginData.json";

export class LoginPage extends BasePage{
    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");

    async navigate() {
        await this.page.goto("https://your-lms-url.com/login/");
    }

    async enterEmail(email: string) {
        await this.email.fill(loginData.validlogin.email);
    }

    async enterPassword(password: string) {
        await this.password.fill(loginData.validlogin.password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }


}