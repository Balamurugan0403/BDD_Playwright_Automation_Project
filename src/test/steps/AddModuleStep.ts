import { CourseStructurePage } from './../pages/CourseStructurePage';
import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import courseData from "../../resources/data/CourseStructureData.json";

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