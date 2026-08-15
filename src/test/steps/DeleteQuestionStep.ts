import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { readExcelData } from "../../main/utils/excelReader";

setDefaultTimeout(60000);

let currentCategory: string;
let currentQuestionText: string;


When("the user searches for the question {string}", async function (
    this: CustomWorld,
    testCase: string
) {
    const questions = readExcelData("questionBank.xlsx", "Questions") as {
        TestCase: string;
        Question: string;
        Category: string;
        Option1: string;
        Option2: string;
        CorrectOptionIndex: number;
    }[];
    const data = questions.find(q => q.TestCase === testCase);
    if (!data) {
        throw new Error(`No data found for test case '${testCase}'`);
    }
    currentCategory = data.Category;
    currentQuestionText = data.Question;
    await this.questionBankPage.searchQuestion(currentCategory);
});


When("the user clicks the {string} icon for the question", async function (
    this: CustomWorld,
    iconName: string
) {
    if (iconName === "Delete") {
        await this.questionBankPage.clickDeleteIcon();
    }
});


When("the user confirms the deletion", async function (this: CustomWorld) {
    await this.questionBankPage.confirmDeletion();
});


Then("the question should not be displayed in the question list", async function (
    this: CustomWorld
) {
    await this.questionBankPage.verifyQuestionNotDisplayed(currentQuestionText);
});