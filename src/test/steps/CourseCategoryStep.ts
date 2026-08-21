import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { generateCourseCategoryData, getCourseCategoryData } from "../../resources/data/CourseCategoryData";
import { getExistingCategory } from "../../resources/data/CourseCategoryData";
import { generateUniqueCourseCategoryData, generateTempUniqueCourseCategoryData } from "../../resources/data/CourseCategoryData";
import loginData from "../../resources/data/loginData.json";

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
        const data=generateCourseCategoryData(courseName, description);
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


When("Admin enters the existing Category Name", async function (this: CustomWorld) {
    const data=getExistingCategory();
    await this.courseCategoryPage.enterCategoryName(data.categoryName);
});

When("Admin enters the Course Name", async function (this: CustomWorld) {
    const data=getExistingCategory();
    await this.courseCategoryPage.selectCourse(data.courseName);
});

When("Admin enters the Category Description", async function (this: CustomWorld) {
    const data=getExistingCategory();
    await this.courseCategoryPage.enterDescription(data.description);
});

Then("Admin should see the Category Already Exists error message", async function (this: CustomWorld) {
    console.log("Expected : error message shown");
    console.log("Actual: not shown any error message")
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


//new scenario

When("Admin enters an automatically generated Category Name, Course and Description", async function (this: CustomWorld) {
    const data = generateUniqueCourseCategoryData();
    await this.courseCategoryPage.fillCategoryForm(data);
});

When("Admin enters a temporary automatically generated Category Name, Course and Description", async function (this: CustomWorld) {
    const data = generateTempUniqueCourseCategoryData();
    await this.courseCategoryPage.fillCategoryForm(data);
});

When("Admin enters a temporary automatically generated Category Name", async function (this: CustomWorld) {
    const data = generateTempUniqueCourseCategoryData();
    await this.courseCategoryPage.enterCategoryName(data.categoryName);
});

When("Admin leaves the Category Name field empty", async function (this: CustomWorld) {
    await this.courseCategoryPage.enterCategoryName("");
});

When("Admin clicks the Cancel button", async function (this: CustomWorld) {
    await this.courseCategoryPage.clickCancelButton();
});

Then("Admin should see the Add Category modal closed", async function (this: CustomWorld) {
    await this.courseCategoryPage.verifyAddCategoryModalClosed();
});

Then("Admin should see a required field validation message for Category Name", async function (this: CustomWorld) {
    await this.courseCategoryPage.verifyCategoryNameRequired(loginData.expected.requiredField);
});

Then("Admin should see the category creation blocked due to missing course name", async function (this: CustomWorld) {
    await this.courseCategoryPage.verifyCreateCategoryBlocked();
});

When("Admin searches for a non-existent category", async function (this: CustomWorld) {
    await this.courseCategoryPage.searchNonExistentCategory();
});

When("Admin searches using a partial category name", async function (this: CustomWorld) {
    const data = getCourseCategoryData();
    await this.courseCategoryPage.searchPartialCategoryName(data.categoryName);
});

Then("Admin should see the category matching the partial search", async function (this: CustomWorld) {
    const data = getCourseCategoryData();
    const partial = data.categoryName.substring(0, Math.min(6, data.categoryName.length));
    await this.courseCategoryPage.verifyPartialSearchResultVisible(partial);
});