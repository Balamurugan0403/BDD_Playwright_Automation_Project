
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60000);
Given("the user navigates to the login page", async function (this: CustomWorld) {
    await this.loginPage.navigate();
});

When("the user enters a valid email", async function (this: CustomWorld) {
    await this.loginPage.enterEmail();
});

When("the user enters a valid password", async function (this: CustomWorld) {
    await this.loginPage.enterPassword();
});

When("the user clicks the Login button", async function (this: CustomWorld) {
    await this.loginPage.clickLoginButton();
});

Then("the user should be redirected to the dashboard", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/admindashboard/, { timeout: 15000 });
    console.log("Admin logged in successfully");
});