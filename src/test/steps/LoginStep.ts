import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";

Given("the user navigates to the login page", async function (this: CustomWorld) {
    await this.loginPage.navigate();
});

When("the user enters a valid email", async function (this: CustomWorld,email:string) {
    await this.loginPage.enterEmail(email);
});

When("the user enters a valid password", async function (this: CustomWorld, password:string) {
    await this.loginPage.enterPassword(password);
});

When("the user clicks the Login button", async function (this: CustomWorld) {
    await this.loginPage.clickLoginButton();
});

Then("the user should be redirected to the dashboard", async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/admindashboard/, { timeout: 15000 });
});