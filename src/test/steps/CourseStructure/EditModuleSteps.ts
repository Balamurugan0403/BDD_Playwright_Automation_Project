import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from '../../../main/support/CustomWorld';
import { CSVReader } from "../../../main/utils/csv_reader";

When('the Admin clicks the Edit option', async function () {

    const data = CSVReader.getData<any>(
        "src/resources/data/CourseStructureData.csv"
    );

    const editData = data.find(
        row => row.Scenario === "EditValidData"
    );

    if (!editData) {
        throw new Error(
            "EditValidData test data not found in CSV"
        );
    }

    await this.courseStructurePage.editModule(
        editData.ExistingTitle
    );
});


When('the Admin updates the module with valid data from CSV', async function () {

    const data = CSVReader.getData<any>(
        "src/resources/data/CourseStructureData.csv"
    );

    const editData = data.find(
        row => row.Scenario === "EditValidData"
    );

    if (!editData) {
        throw new Error(
            "EditValidData test data not found in CSV"
        );
    }

    const skills = editData.UpdatedSkills
        .split(",")
        .map((skill: string) => skill.trim());

    await this.courseStructurePage.updateModule(
        editData.UpdatedTitle,
        editData.UpdatedDescription,
        skills
    );
});

When('the Admin saves the module', async function () {
    await this.courseStructurePage.saveModule();
});

Then('the module should be updated successfully', async function () {
    const data = CSVReader.getData<any>("src/resources/data/CourseStructureData.csv");
    const editData = data.find(row => row.Scenario === "EditValidData");

    if (!editData) {
        throw new Error("EditValidData test data not found in CSV");
    }

    await this.courseStructurePage.verifyModuleUpdated(editData.UpdatedTitle);
});