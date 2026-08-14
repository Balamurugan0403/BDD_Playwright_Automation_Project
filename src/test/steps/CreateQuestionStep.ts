import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

setDefaultTimeout(60000);


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


When("the user fills the question details", async function (
    this: CustomWorld
) {
    await this.questionBankPage.fillQuestionDetails();
});


Then("the question should be displayed in the question list", async function (
    this: CustomWorld
) {
    await this.questionBankPage.verifyQuestionDisplayed();
});