import { CourseStructurePage } from './../../pages/CourseStructurePage';
import { When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from '../../../main/support/CustomWorld';


When("the Admin enables hierarchy action", async function (this: CustomWorld) {
    await this.courseStructurePage.enableHierarchyOption();
});

When("the Admin deletes the following module", async function (this: CustomWorld, dataTable: DataTable) {
    const modules = dataTable.hashes();

    for (const module of modules) {
        await this.courseStructurePage.deleteModule(module.moduleTitle);
    }
});

When("the Admin confirms the delete action", async function(this: CustomWorld){
    await this.courseStructurePage.confirmDeleteAction();
});

When("the Admin cancels the delete action", async function(this: CustomWorld){
    await this.courseStructurePage.cancelDeleteAction();
});
    

Then("the module {string} should not appear in the course structure", async function (this: CustomWorld, moduleTitle: string) {
    await this.courseStructurePage.verifyModuleDeleted(moduleTitle);
});