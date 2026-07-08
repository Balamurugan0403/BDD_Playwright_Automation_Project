import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import courseData from "../../resources/data/AddCourseData.json";

setDefaultTimeout(60000);

When('the admin clicks the {string} button', async function (button: string) {
    expect(["Add Course", "Next"]).toContain(button);
    await this.addCoursePage[button === "Add Course" ? "clickAddCourse" : "clickNext"]();
});

Then('the {string} tab opens', async function (tab: string) {
    expect(tab).toBe("Create New Course Setup");
    await this.addCoursePage.verifyCreateNewCourseTab();
});

When('the admin fills in the Course Basic Configuration form using {string} test data', async function (data: string) {
    expect(data).toBe("validCourseSetup");
    await this.addCoursePage.fillCourseBasicConfiguration(courseData);
});

Then('the {string} field is auto-generated with a value', async function (field: string) {
    expect(field).toBe("Course ID");
    await this.addCoursePage.verifyCourseIdGenerated();
});

Then('the admin is navigated to the {string} tab', async function (tab: string) {
    expect(tab).toBe("Course Hierarchy and Layout");
    await this.addCoursePage.verifyCourseHierarchyTab();
});