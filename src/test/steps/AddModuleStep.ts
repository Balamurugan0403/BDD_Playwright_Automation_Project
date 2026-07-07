import { BasePage } from './../pages/BasePage';
import { Given, When, Then } from "@cucumber/cucumber";
import courseData from "../../resources/data/CourseStructureData.json";

Given("the Admin is logged into the LMS", async function () {
    await this.BasePage
    await this.loginPage.enterEmail("testing@gmail.com");
    await this.loginPage.enterPassword("123");
    await this.loginPage.clickLoginButton();
});

Given("the Admin navigates to the Course Structure page", async function () {
    await this.courseStructurePage.navigateToCourseStructure();
});

When("the Admin clicks the {string} button", async function (button: string) {

    switch (button) {

        case "Add Course Structure":
            await this.courseStructurePage.clickAddCourseStructure();
            break;

        case "Add Module":
            await this.courseStructurePage.clickAddModuleButton();
            break;

        default:
            throw new Error(`Unknown button: ${button}`);
    }
});

When("the Admin clicks the {string} icon", async function (icon: string) {

    switch (icon) {
        case "Add module":
            await this.courseStructurePage.clickAddModuleIcon();
            break;

        default:
            throw new Error(`Unknown icon: ${icon}`);
    }
});

When("the Admin enters valid module details", async function () {

    await this.courseStructurePage.enterModuleTitle(courseData.moduleTitle);
    await this.courseStructurePage.enterDescription(courseData.description);
});

Then("a success message should be displayed", async function () {
    await this.courseStructurePage.verifySuccessMessage();
});

Then("the module should appear in the course structure", async function () {
    await this.courseStructurePage.verifyModulePresent(courseData.moduleTitle);
});