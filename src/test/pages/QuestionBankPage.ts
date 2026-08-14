import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class QuestionBankPage extends BasePage {
    private createQuestionButton = this.page.getByRole("button", {
        name: "Create Question"
    });
    private mcqQuestionOption = this.page.getByRole("button", {
        name: "MCQ Question"
    });
    private questionInput = this.page.locator(
        "//div[@class='py-1.5 min-h-[36px] focus:outline-none text-sm text-gray-800 dark:text-gray-200 font-medium prose prose-sm max-w-none dark:prose-invert']"
    );
    private categoryInput = this.page.locator(
        "//input[@placeholder='e.g., Data Structures']"
    );
    private firstOptionInput = this.page.locator(
        "//div[@class='bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all overflow-visible shadow-sm border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700']//div[1]//div[1]//div[1]//div[2]//input[1]"
    );
    private secondOptionInput = this.page.locator(
        "//div[@class='grid gap-2 grid-cols-1']//div[2]//div[1]//div[1]//div[2]//input[1]"
    );
    private answerKeyButton = this.page.getByRole("button", {
        name: "Answer key"
    });
    private correctAnswer = this.page.locator(
        "//div[@class='px-4 py-3']//button[2]"
    );
    private doneButton = this.page.getByRole("button", {
        name: "Done",
        exact: true
    });
    private saveQuestionsButton = this.page.locator(
        "//button[@class='px-6 py-2 text-white rounded-xl text-xs font-bold disabled:opacity-50 flex items-center gap-1.5 transition-all bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-600 hover:opacity-90']"
    );
    private searchQuestionsInput = this.page.locator(
        "//input[@placeholder='Search questions...']"
    );

    async clickCreateQuestion() {
        logger.info("Clicking Create Question button");
        await this.createQuestionButton.click();
        logger.info("Selecting MCQ Question");
        await this.mcqQuestionOption.click();
    }

    async fillQuestionDetails() {
        logger.info("Filling question details");
        await this.questionInput.fill(
            "Which operating system component is responsible for managing processes and allocating CPU time?"
        );
        await this.categoryInput.fill("Operating Systems");
        await this.firstOptionInput.fill("Process Scheduler");
        await this.secondOptionInput.fill("File System");
        logger.info("Opening Answer Key");
        await this.answerKeyButton.click();
        logger.info("Selecting the correct answer");
        await this.correctAnswer.click();
        logger.info("Clicking Done");
        await this.doneButton.click();
    }

    async clickSaveQuestions() {
        logger.info("Clicking Save Questions button");
        await this.saveQuestionsButton.click();
    }

    async verifyQuestionDisplayed() {
        logger.info("Searching for created question");
        await this.searchQuestionsInput.fill("Operating Systems");
        await this.page.waitForTimeout(2000);
        logger.info("Verifying the matching question is displayed");
        await expect(
            this.page.getByText(
                "Which operating system component is responsible for managing processes and allocating CPU time?",
                { exact: true }
            ).first()
        ).toBeVisible({
            timeout: 15000
        });
    }
}