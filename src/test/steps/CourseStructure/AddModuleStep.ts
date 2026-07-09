import { CourseStructurePage } from '../../pages/CourseStructurePage';
import { When, Then } from "@cucumber/cucumber";
import courseData from "../../../resources/data/CourseStructureData.json";
import { CustomWorld } from '../../../main/support/CustomWorld';

let previousCount: number;

When("the Admin search the course", async function (this: CustomWorld) {
    await this.courseStructurePage.searchCourse( CourseStructurePage.createdCourseId);
});

When("the Admin clicks the {string} button", async function (this: CustomWorld, button: string) {
    switch (button) {
        case "Add Course Structure":
            await this.courseStructurePage.clickAddCourseStructure();
            break;

        default:
            throw new Error(`Unknown button: ${button}`);
    }
});

// When("the Admin clicks the {string} icon", async function (this: CustomWorld, icon: string) {
//     switch (icon) {
//         case "Add module":
//             await this.courseStructurePage.clickAddModuleIcon();
//             break;

//         default:
//             throw new Error(`Unknown icon: ${icon}`);
//     }
// });

When("the Admin add the module with valid details", async function (this: CustomWorld) {
    for (const module of courseData.validModule) {
        await this.courseStructurePage.addModule(module.moduleTitle, module.description, module.skills);
    }
});

When("the Admin add the module without entering the title", async function (this: CustomWorld) {
    await this.courseStructurePage.addModuleWithoutTitle();
});

When("the Admin adds the module with title {string} description {string} and skills {string}",  async function (this: CustomWorld, title: string, description: string, skills: string[]) {
    await this.courseStructurePage.addModule(title, description, skills);
});

When("the Admin add module with existing module name", async function (this: CustomWorld) {
    for (const module of courseData.existingModule) {
        await this.courseStructurePage.addModule(module.moduleTitle, module.description, module.skills);
    }
});

Then("the module count should increase for the existing module", async function (this: CustomWorld) {
    for (const module of courseData.existingModule) {
        previousCount = await this.courseStructurePage.getModuleCount(module.moduleTitle);
        await this.courseStructurePage.verifyModuleCountIncreased(module.moduleTitle,previousCount);
    }
});

Then("a success message should be displayed", async function (this: CustomWorld) {
    await this.courseStructurePage.verifySuccessMessage();
});

Then("the module should appear in the course structure", async function (this: CustomWorld) {
    for (const module of courseData.validModule) {
        await this.courseStructurePage.verifyModulePresent(module.moduleTitle);
    }
});

Then("the title validation message should be displayed", async function (this: CustomWorld) {
    await this.courseStructurePage.verifyTitleValidationMessage();
});

Then("the module {string} should appear in the course structure", async function (this: CustomWorld ,title: string) {
    await this.courseStructurePage.verifyModulePresent(title);
});