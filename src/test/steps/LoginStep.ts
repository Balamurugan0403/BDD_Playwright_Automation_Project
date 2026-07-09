import { expect } from "@playwright/test";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import loginData from "../../resources/data/loginData.json";

setDefaultTimeout(60000);

Given("the user launched the application", async function (this: CustomWorld) {
    await this.loginPage.navigate();
});

// Valid Login

When("the user enters a valid email", async function (this: CustomWorld) {
    await this.loginPage.enterEmail(loginData.validlogin.email);
});

When("the user enters a valid password", async function (this: CustomWorld) {
    await this.loginPage.enterPassword(loginData.validlogin.password);
});

When("the user clicks the Login button", async function (this: CustomWorld) {
    await this.loginPage.clickLoginButton();
});

Then("the user should be redirected to the dashboard", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/admindashboard/, {timeout: 120000,});
});

// Invalid Login

When("the user enters {string} credentials", async function (this: CustomWorld, loginType: string) {
    const credentials = (loginData as any)[loginType];
    await this.loginPage.enterCredentials(credentials.email, credentials.password);
});

Then("the login should fail", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/login/);
});

Then("an error message should be displayed", async function (this: CustomWorld) {
    await expect(
        this.page.locator("text=Invalid email or password")
    ).toBeVisible();
});