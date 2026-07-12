import { expect } from "@playwright/test";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../../main/support/CustomWorld";
import loginData from "../../../resources/data/loginData.json";

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

Then("the login should fail And {string} should be displayed", async function (this: CustomWorld,expectedMessage:string) {
    await expect(this.page).toHaveURL(/login/);
    await this.loginPage.verifyToastMessage(expectedMessage);
});
When("User leaves the email field empty", async function (this: CustomWorld) {

    await this.loginPage.enterEmail("");

});

When("User leaves the password field empty", async function (this: CustomWorld) {

    await this.loginPage.enterPassword("");

});
Then("User should see the required field validation message", async function (this: CustomWorld) {

    await this.loginPage.verifyRequiredField(loginData.expected.requiredField);

});





