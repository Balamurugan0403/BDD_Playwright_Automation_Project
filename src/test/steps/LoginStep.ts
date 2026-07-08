import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import loginData from "../../resources/data/loginData.json";

setDefaultTimeout(60000);

Given("the user launched the application", async function (this: CustomWorld) {
    await this.loginPage.navigate();
});

// VALID LOGIN

When("the user logs in with valid credentials", async function (this: CustomWorld) {

    await this.loginPage.login(
        loginData.validlogin.email,
        loginData.validlogin.password
    );

});

Then("the user should be redirected to the dashboard", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/admindashboard/);
});

// INVALID LOGIN

When("the user enters {string} credentials", async function (this: CustomWorld, loginType: string) {

    const credentials = (loginData as any)[loginType];

    await this.loginPage.loginWithInvalidCredentials(
        credentials.email,
        credentials.password
    );

});

Then("the login should fail", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/login/);
});

Then("an error message should be displayed", async function (this: CustomWorld) {
    await expect( this.page.locator("text=Invalid email or password")).toBeVisible();
});