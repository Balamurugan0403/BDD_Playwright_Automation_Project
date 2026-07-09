import { BasePage } from "./BasePage";
import loginData from "../../resources/data/loginData.json";
import { config } from "../../main/config/config";

export class LoginPage extends BasePage {

<<<<<<< HEAD
=======
export class LoginPage extends BasePage {

>>>>>>> 323b9dd (CourseCategory feature Created)
    private email = this.page.locator("#email");
    private password = this.page.locator("#password");
    private loginButton = this.page.locator("button[type='submit']");

<<<<<<< HEAD
=======
    async navigate() {
        await this.page.goto("https://lms-smartcliff.vercel.app/login");
        await this.email.waitFor({ state: "visible" });
    }
>>>>>>> 323b9dd (CourseCategory feature Created)

    async enterEmail() {
        await this.email.fill(loginData.validlogin.email);
    }

    async enterPassword() {
        await this.password.fill(loginData.validlogin.password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
       
    }
<<<<<<< HEAD

    async login(email:string, password:string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
=======
>>>>>>> 323b9dd (CourseCategory feature Created)
}
