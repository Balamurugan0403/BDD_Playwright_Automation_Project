import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import courseData from "../../resources/data/AddCourseData.json";

setDefaultTimeout(60000);

When('the admin clicks the {string} button', async function (button: string) {
    expect(["Add Course", "Next", "Preview & Create"]).toContain(button);

    if (button === "Add Course") {
        await this.addCoursePage.clickAddCourse();
    } else if (button === "Next") {
        await this.addCoursePage.clickNext();
    } else if (button === "Preview & Create") {
        await this.addCoursePage.clickPreviewAndCreate();
    }
});

Then('the {string} tab opens', async function (tab: string) {
    expect(tab).toBe("Create New Course Setup");
    await this.addCoursePage.verifyCreateNewCourseTab();
});

When('the admin fills in the Course Basic Configuration form using {string} test data', async function (dataKey: string) {
    const data = (courseData as any)[dataKey].basicConfigurationData;
    await this.addCoursePage.fillCourseBasicConfiguration(data);
});

Then('the {string} field is auto-generated with a value', async function (field: string) {
    expect(field).toBe("Course ID");
    await this.addCoursePage.verifyCourseIdGenerated();
});

Then('the admin is navigated to the {string} tab', async function (tab: string) {
    expect(tab).toBe("Course Hierarchy and Layout");
    await this.addCoursePage.verifyCourseHierarchyTab();
});

When('the admin completes the Course Hierarchy and Layout section', async function () {
    const data = courseData.validCourseSetup.courseHierarchy;
    await this.addCoursePage.fillCourseHierarchyAndLayout(data);
});