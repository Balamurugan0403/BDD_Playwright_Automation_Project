import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import categoryData from "../../resources/data/categoryData.json";
import loginData from "../../resources/data/loginData.json";

setDefaultTimeout(60000);

Given("Admin is logged into the LMS application", async function (this: CustomWorld) {
     await this.loginPage.navigate();
     await this.loginPage.login(
        loginData.validlogin.email,
        loginData.validlogin.password
    );
    await expect(this.page).toHaveURL(/admindashboard/, {timeout: 120000,});
    console.log("Admin logged in successfully");
});

Given("Admin navigates to the Dynamic Field Management page", async function (this: CustomWorld) {
    await this.dynamicFieldManagementPage.openDynamicFieldManagement();
});

Given("Admin navigates to the Course Category section", async function (this: CustomWorld) {
    await this.dynamicFieldManagementPage.openCategoryManagement();
});

When("Admin clicks the Add Category button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickAddCategory();
});

When("Admin enters the Category Name as {string}", async function (this: CustomWorld, categoryName: string) {
    await this.courseCategoryPage.enterCategoryName(categoryName);
});

When("Admin selects the Course Name as {string}", async function (this: CustomWorld, courseName: string) {
    await this.courseCategoryPage.selectCourse(courseName);
});

When("Admin enters the Category Description as {string}", async function (this: CustomWorld, description: string) {
    await this.courseCategoryPage.enterDescription(description);
});

When("Admin clicks the Create Category button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickCreateCategory();
});

Then("Admin should see the Category Created Successfully message", async function (this: CustomWorld) {
    await this.courseCategoryPage.verifyCategoryCreated();
});

When("Admin searches for the category",async function (this: CustomWorld) {
    await this.courseCategoryPage.enterCategorySearch(categoryData.categoryName);
});

Then ("Admin should see the category in the category list", async function(this:CustomWorld){
    await this.courseCategoryPage.verifyCategorySearchKey();
});