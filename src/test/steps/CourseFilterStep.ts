import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { readExcelData } from "../../main/utils/excelReader";

When("User navigates to the Course Management page", async function (this: CustomWorld) {
    await this.courseFilterPage.clickCourseManagement();
});

When("User opens the Filters panel", async function (this: CustomWorld) {
    await this.courseFilterPage.clickFilters();
});

When("User selects {string} from the Category dropdown", async function (this: CustomWorld, category: string) {
    await this.courseFilterPage.selectCategory(category);
});

Then("Only {string} courses should be displayed", async function (this: CustomWorld, category: string) {
    await this.courseFilterPage.verifySelectedCategory(category);
});



When("User selects a level from the Level dropdown", async function (this: CustomWorld) {
    const data = readExcelData("FilterLevels.xlsx", "Levels") as { Level: string }[];
    for (const row of data) {
        await this.courseFilterPage.selectLevel(row.Level);
    }

});

Then("Only courses matching the selected level should be displayed", async function (this: CustomWorld) {
    const data = readExcelData("FilterLevels.xlsx", "Levels") as { Level: string }[];
    for (const row of data) {
        await this.courseFilterPage.selectLevel(row.Level);
        await this.courseFilterPage.verifySelectedLevel(row.Level);
    }
});


When("User opens the Level dropdown", async function (this: CustomWorld) {
    await this.courseFilterPage.clickLevelDropdown();

});

When("User opens the Sort By dropdown", async function (this: CustomWorld) {
    await this.courseFilterPage.clickSortByDropdown();

});
When("User selects Course Name from the Sort By dropdown", async function (this: CustomWorld) {
    await this.courseFilterPage.selectSortByCourseName();
});

Then("Courses should be displayed in reverse alphabetical order by course name", async function (this: CustomWorld) {
    await this.courseFilterPage.verifySortedByCourseName();
    
});