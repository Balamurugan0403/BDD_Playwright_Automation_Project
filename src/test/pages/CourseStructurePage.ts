import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class CourseStructurePage extends BasePage {

    private readonly courseRow: Locator;
    private readonly addCourseStructureButton: Locator;
    private readonly addModuleIcon: Locator;
    private readonly moduleTitleTextBox: Locator;
    private readonly descriptionTextBox: Locator;
    private readonly addModuleBtn: Locator;
    private readonly saveBtn: Locator;
    private readonly successMsg: Locator;
    private readonly moduleRows: Locator;

    public static createdCourseId: string = "PT-BTI-H-004";

    constructor(page: Page) {
        super(page);

        this.courseRow = this.page
            .locator("tbody tr")
            .filter({ hasText: CourseStructurePage.createdCourseId });

        this.addCourseStructureButton = this.courseRow.getByRole("button", {name: "Add Course Structure",});

        this.addModuleIcon = this.page.getByTitle("Add module");
        this.moduleTitleTextBox = this.page.getByPlaceholder("Enter title...");
        this.descriptionTextBox = this.page.getByPlaceholder("Brief description ...");
        this.addModuleBtn = this.page.getByRole("button", {name: "Add Module",});
        this.saveBtn = this.page.getByRole('button', {name: "Save"});
        this.successMsg = this.page.locator(".Toastify__toast--success");
        this.moduleRows = this.page.locator("tbody tr");
    }

    async navigateToCourseStructure(): Promise<void> {
        try {
            logger.info("Navigating to Course Structure page.");

            await this.page.goto("https://lms-smartcliff.vercel.app/lms/pages/coursestructure");

            logger.info("Successfully navigated to Course Structure page.");
        } catch (error) {
            logger.error(`Failed to navigate to Course Structure page: ${error}`);
            throw new Error(`Failed to navigate to Course Structure page: ${error}`);
        }
    }

    async clickAddCourseStructure(): Promise<void> {
        try {
            logger.info(
                `Clicking Add Course Structure button for Course ID: ${CourseStructurePage.createdCourseId}`
            );

            await this.addCourseStructureButton.waitFor({ state: "visible" });
            await this.addCourseStructureButton.click();

            logger.info("Successfully clicked Add Course Structure button.");
        } catch (error) {
            logger.error(`Failed to click Add Course Structure button: ${error}`);
            throw new Error(`Failed to click Add Course Structure button: ${error}`);
        }
    }

    async clickAddModuleIcon(): Promise<void> {
        try {
            logger.info("Clicking Add Module icon.");

            await this.addModuleIcon.waitFor({ state: "visible" });
            await this.addModuleIcon.click();

            logger.info("Successfully clicked Add Module icon.");
        } catch (error) {
            logger.error(`Failed to click Add Module icon: ${error}`);
            throw new Error(`Failed to click Add Module icon: ${error}`);
        }
    }

    async enterModuleTitle(moduleTitle: string): Promise<void> {
        try {
            logger.info(`Entering module title: ${moduleTitle}`);

            await this.moduleTitleTextBox.fill(moduleTitle);

            logger.info("Module title entered successfully.");
        } catch (error) {
            logger.error(`Failed to enter module title '${moduleTitle}': ${error}`);
            throw new Error(`Failed to enter module title '${moduleTitle}': ${error}`);
        }
    }

    async enterDescription(description: string): Promise<void> {
        try {
            logger.info("Entering module description.");

            await this.descriptionTextBox.fill(description);

            logger.info("Module description entered successfully.");
        } catch (error) {
            logger.error(`Failed to enter module description: ${error}`);
            throw new Error(`Failed to enter module description: ${error}`);
        }
    }

    async clickAddModuleButton(): Promise<void> {
        try {
            logger.info("Clicking Save button.");

            // await this.saveBtn.waitFor({ state: "visible" });
            // await this.saveBtn.click();
            
            await this.addModuleBtn.waitFor({ state: "visible" });
            await this.addModuleBtn.click();

            logger.info("Successfully clicked Save button.");
        } catch (error) {
            logger.error(`Failed to click Save button: ${error}`);
            throw new Error(`Failed to click Save button: ${error}`);
        }
    }

    async verifySuccessMessage(): Promise<void> {
        try {
            logger.info("Verifying success message.");

            await expect(this.successMsg).toBeVisible({ timeout: 10000 });

            logger.info("Success message verified successfully.");
        } catch (error) {
            logger.error(`Success message verification failed: ${error}`);
            throw new Error(`Success message verification failed: ${error}`);
        }
    }

    async verifyModulePresent(moduleTitle: string): Promise<void> {
        try {
            logger.info(`Verifying module '${moduleTitle}' is present.`);

            const moduleRow = this.moduleRows
                .filter({ hasText: moduleTitle })
                .first();

            await expect(moduleRow).toBeVisible();

            logger.info(`Module '${moduleTitle}' verified successfully.`);
        } catch (error) {
            logger.error(`Module '${moduleTitle}' was not found: ${error}`);
            throw new Error(`Module '${moduleTitle}' was not found: ${error}`);
        }
    }
}