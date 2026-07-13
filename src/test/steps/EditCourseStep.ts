import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { getEditCourseData } from "../../resources/data/EditCourseData";

setDefaultTimeout(60000);

const editCourseState:any = {};

When("the admin searches for the course by client name", async function(this:CustomWorld){
    const editData = getEditCourseData();
    editCourseState.editData = editData;
    await this.editCoursePage.searchCourse(editData.searchClientName);
});

When("the admin selects the {string} option for the searched course", async function(this:CustomWorld, optionName:string){
    await this.editCoursePage.selectEditCourseOption(editCourseState.editData.searchClientName);
});

When("the admin updates the course details with valid changes", async function(this:CustomWorld){
    const editData = editCourseState.editData;
    await this.addCoursePage.selectCourseCategory(editData.updatedCourseCategory);
    await this.addCoursePage.selectCourseName(editData.updatedCourseName);
    await this.addCoursePage.clickNext();
    await this.addCoursePage.enterDescription(editData.updatedDescription);
});

When("the admin saves the changes", async function(this:CustomWorld){
    await this.editCoursePage.clickPreviewAndUpdate();
    await this.addCoursePage.verifyCourseLayoutPreview();
    await this.editCoursePage.clickSaveChanges();
});

Then("the course list should reflect the updated details", async function(this:CustomWorld){
    await this.editCoursePage.verifyCourseUpdated(editCourseState.editData.updatedCourseName);
});