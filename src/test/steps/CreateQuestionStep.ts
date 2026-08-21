import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { readExcelData } from "../../main/utils/excelReader";

setDefaultTimeout(60000);

let currentCategory: string;
let currentQuestionText: string;


When("the user clicks the {string} button", async function (
    this: CustomWorld,
    buttonName: string
) {
    if (buttonName === "Create Question") {
        await this.questionBankPage.clickCreateQuestion();

    } else if (buttonName === "Save Questions") {
        await this.questionBankPage.clickSaveQuestions();
    }
});


When("the user fills the question details for {string}", async function (
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
    await this.questionBankPage.fillQuestionDetails(data);
});


Then("the question should be displayed in the question list", async function (
    this: CustomWorld
) {
    await this.questionBankPage.verifyQuestionDisplayed(currentCategory, currentQuestionText);
});