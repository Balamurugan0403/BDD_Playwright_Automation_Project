// import { When, Then, DataTable } from "@cucumber/cucumber";


// When("the Admin enables hierarchy action", async function () {
//     await this.courseStructurePage.enableHierarchyAction();
// });

// When("the Admin deletes the following module", async function (dataTable: DataTable) {
//     const modules = dataTable.hashes();

//     for (const module of modules) {
//         await this.courseStructurePage.deleteModule(module.moduleTitle);
//     }
// });

// Then("the module {string} should not appear in the course structure", async function (moduleTitle: string) {
//     await this.courseStructurePage.verifyModuleNotPresent(moduleTitle);
// });