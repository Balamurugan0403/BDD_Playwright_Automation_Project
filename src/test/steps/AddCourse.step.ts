import { AddCoursePage } from "./../pages/AddCoursePage";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import courseData from "../../resources/data/AddCourseData.json";

setDefaultTimeout(60000);

When('the admin clicks the {string} button', async function (button: string) {
    expect(["Add Course", "Next", "Preview & Create", "Create Course"]).toContain(button);

    if (button === "Add Course") {
        await this.addCoursePage.clickAddCourse();
    } else if (button === "Next") {
        await this.addCoursePage.clickNext();
    } else if (button === "Preview & Create") {
        await this.addCoursePage.clickPreviewAndCreate();
    } else if (button === "Create Course") {
        await this.addCoursePage.clickCreateCourse();
    }
});

When('the admin clicks the {string} button without filling all mandatory fields', async function (button: string) {
    await this.addCoursePage.clickNext();
});

Then('the {string} tab opens', async function (tab: string) {
    await this.addCoursePage.verifyTabVisible(tab);
});

When('the admin fills in the Course Basic Configuration form using {string} test data', async function (dataKey: string) {
    const data = (courseData as any)[dataKey].basicConfigurationData;
    await this.addCoursePage.fillCourseBasicConfiguration(data);
});

Then('the admin is navigated to the {string} tab', async function (tab: string) {
    expect(tab).toBe("Course Hierarchy and Layout");
    await this.addCoursePage.verifyCourseHierarchyTab();
});

When('the admin fills the Course Hierarchy and Layout section using {string} test data', async function (dataKey: string) {
    const data = (courseData as any)[dataKey].courseHierarchy;
    await this.addCoursePage.fillCourseHierarchyAndLayout(data);
});

Then('a validation error message should be displayed', async function () {
    await this.addCoursePage.verifyValidationErrorDisplayed();
});

Then('the admin remains on the {string} tab', async function (tabName: string) {
    await this.addCoursePage.verifyTabVisible(tabName);
});

Then('the course layout preview should be displayed', async function () {
    await this.addCoursePage.verifyCourseLayoutPreview();
});

Then('a course success message should be displayed', async function () {
    await this.addCoursePage.verifySuccessMessage();
});