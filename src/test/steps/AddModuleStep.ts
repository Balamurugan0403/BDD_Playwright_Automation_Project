import { CourseStructurePage } from './../pages/CourseStructurePage';
import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import courseData from "../../resources/data/CourseStructureData.json";
import { DataTable } from "@cucumber/cucumber";

Given("the Admin is logged into the LMS", async function () {
    await this.loginPage.navigate();
    await this.loginPage.enterEmail();
    await this.loginPage.enterPassword();
    await this.loginPage.clickLoginButton();

    await expect(this.page).toHaveURL(/admindashboard/, {timeout: 120000,});

    console.log("Admin logged in successfully");
});

Given("the Admin navigates to the Course Structure page", async function () {
    await this.courseStructurePage.navigateToCourseStructure();
});

When("the Admin search the course", async function () {
    await this.courseStructurePage.searchCourse( CourseStructurePage.createdCourseId);
});

When("the Admin clicks the {string} button", async function (button: string) {
    switch (button) {
        case "Add Course Structure":
            await this.courseStructurePage.clickAddCourseStructure();
            break;

        default:
            throw new Error(`Unknown button: ${button}`);
    }
});

// When("the Admin clicks the {string} icon", async function (icon: string) {
//     switch (icon) {
//         case "Add module":
//             await this.courseStructurePage.clickAddModuleIcon();
//             break;

//         default:
//             throw new Error(`Unknown icon: ${icon}`);
//     }
// });

When("the Admin add the module with valid details", async function () {
    for (const module of courseData) {
        await this.courseStructurePage.addModule(module.moduleTitle, module.description);
    }
});

When("the Admin add the module without entering the title", async function () {
    await this.courseStructurePage.addModuleWithoutTitle();
});

When("the Admin add the module with exceed title length", async function (dataTable: DataTable) {
    const data = dataTable.hashes()[0];
    await this.courseStructurePage.addModuleWithExceedTitleLength(data.title);
});

When("the Admin adds the module with title {string} and description {string}",  async function (title: string, description: string) {
    await this.courseStructurePage.addModule(title, description);
});

Then("the admin shouldn't be able to add the module", async function () {
    await this.courseStructurePage.verifyModuleNotAdded();
});

Then("a success message should be displayed", async function () {
    await this.courseStructurePage.verifySuccessMessage();
});

Then("the module should appear in the course structure", async function () {
    for (const module of courseData) {
        await this.courseStructurePage.verifyModulePresent(module.moduleTitle);
    }
});

Then("the validation message should be displayed", async function () {
    await this.courseStructurePage.verifyTitleValidationMessage();
});

Then("the module {string} should appear in the course structure", async function (title: string) {
    await this.courseStructurePage.verifyModulePresent(title);
});