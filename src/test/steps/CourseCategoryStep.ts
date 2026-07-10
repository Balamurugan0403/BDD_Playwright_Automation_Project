import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { generateCourseCategoryData, getCourseCategoryData } from "../../resources/data/CourseCategoryData";

setDefaultTimeout(60000);

Given("Admin navigates to the Course Category section", async function (this: CustomWorld) {
    await this.dynamicFieldManagementPage.openCategoryManagement();
});

When("Admin clicks the Add Category button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickAddCategory();
});

When(
    "Admin enters a dynamically generated Category Name for course {string} and description {string}",
    async function (this: CustomWorld, courseName: string, description: string) {
        const data = generateCourseCategoryData(courseName, description);
        await this.courseCategoryPage.enterCategoryName(data.categoryName);
    }
);

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

When("Admin searches for the category", async function (this: CustomWorld) {
    const data = getCourseCategoryData();
    await this.courseCategoryPage.enterCategorySearch(data.categoryName);
});

Then("Admin should see the category in the category list", async function (this: CustomWorld) {
    const data = getCourseCategoryData();
    await this.courseCategoryPage.verifyCategorySearchKey(data.categoryName, data.courseName);
});

When(
    "Admin clicks the Select Category dropdown",
    async function (this: CustomWorld) {
        await this.addCoursePage.clickCourseCategoryDropdown();
    }
);


Then("Admin should see the category in the Category dropdown", async function (this: CustomWorld) {
    await this.addCoursePage.verifyCategoryAvailable(getCourseCategoryData().categoryName);
  }
);

When("Admin clicks the Action button for the category", async function (this: CustomWorld) {
    const data = getCourseCategoryData();
    await this.courseCategoryPage.clickActionButton(data.categoryName);
});

When("Admin clicks the Edit option", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickEditOption();
});

When("Admin updates the Category Description as {string}", async function (this: CustomWorld, description: string) {
    await this.courseCategoryPage.updateDescription(description);
});

When("Admin clicks the Save button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickSaveButton();
});

When("Admin clicks the Delete option", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickDeleteOption();
});

When("Admin clicks the Confirm Delete button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickConfirmDelete();
});

Then("Admin should see the No Data Found message", async function (this: CustomWorld) {
    await this.courseCategoryPage.verifyNoDataFound();
});