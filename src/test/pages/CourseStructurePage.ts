import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class CourseStructurePage extends BasePage {
    private readonly courseRow: Locator;
    private readonly addCourseStructureButton: Locator;
    private readonly addModuleIcon: Locator;
    private readonly moduleTitleTextBox: Locator;
    private readonly descriptionTextBox: Locator;
    private readonly submitBtn: Locator;
    //private readonly successMsg: Locator;
    private readonly moduleRows: Locator;

    public static createdCourseId: string = "J-BTI-H-010";

    constructor(page: Page) {
        super(page);
        this.courseRow = this.page.locator("tbody tr").filter({hasText: CourseStructurePage.createdCourseId,});
        this.addCourseStructureButton = this.courseRow.getByRole("button", { name: "Add Course Structure",});
        this.addModuleIcon = this.page.getByTitle("Add module");
        this.moduleTitleTextBox =this.page.getByPlaceholder("Enter title...");
        this.descriptionTextBox =this.page.getByPlaceholder("Brief description ...");
        this.submitBtn =this.page.locator("//button[@type='submit']");
        //this.successMsg =this.page.locator(".Toastify__toast--success");
        this.moduleRows =this.page.locator("tbody tr");
    }

    async navigateToCourseStructure(): Promise<void> {
        try {
            logger.info("Navigating to Course Structure page.");
            await this.page.goto(`${process.env.BASE_URL}/lms/pages/coursestructure/`);
            logger.info("Successfully navigated to Course Structure page.");
        } 
        catch (error) {
            logger.error(`Failed to navigate to Course Structure page: ${error}`);
            throw new Error(`Failed to navigate to Course Structure page: ${error}`);
        }
    }

    async clickAddCourseStructure(): Promise<void> {
        try {
            logger.info("Clicking Add Course Structure button.");
            await this.addCourseStructureButton.waitFor({state: "visible",});
            await this.addCourseStructureButton.click();
            logger.info("Clicked Add Course Structure button.");
        } 
        catch (error) {
            logger.error(`Failed to click Add Course Structure button: ${error}`);
            throw new Error(`Failed to click Add Course Structure button: ${error}`);
        }
    }

    async clickAddModuleIcon(): Promise<void> {
        try {
            logger.info("Clicking Add Module icon.");
            await this.addModuleIcon.waitFor({state: "visible",});
            await this.addModuleIcon.click();
            logger.info("Clicked Add Module icon.");

        } 
        catch (error) {
            logger.error(`Failed to click Add Module icon: ${error}`);
            throw new Error(`Failed to click Add Module icon: ${error}`);
        }
    }

    async enterModuleTitle(moduleTitle: string): Promise<void> {
        try {
            logger.info(`Entering module title: ${moduleTitle}`);
            await this.moduleTitleTextBox.waitFor({state: "visible",});
            await this.moduleTitleTextBox.fill(moduleTitle);
            logger.info(`Module title '${moduleTitle}' entered successfully.`);
        } 
        catch (error) {
            logger.error(`Failed to enter module title '${moduleTitle}': ${error}`);
            throw new Error(`Failed to enter module title '${moduleTitle}': ${error}`);
        }
    }

    async enterDescription(description: string): Promise<void> {
        try {
            logger.info("Entering description.");
            await this.descriptionTextBox.fill(description);
            logger.info("Module description entered successfully.");
        } 
        catch (error) {
            logger.error(`Failed to enter module description: ${error}`);
            throw new Error(`Failed to enter module description: ${error}`);
        }
    }

    async clickSubmitButton(): Promise<void> {
        try {
            logger.info("Clicking Submit button.");
            await this.submitBtn.waitFor({state: "visible",});
            await this.submitBtn.click();
            //await expect(this.successMsg).toBeVisible({timeout: 10000,});
            logger.info("Clicked Submit button.");
        } 
        catch (error) {
            logger.error(`Failed to click Submit button: ${error}`);
            throw new Error(`Failed to click Submit button: ${error}`);
        }
    }

    async addModule(moduleTitle: string, description: string): Promise<void> {
        try {
            logger.info(`Adding module: ${moduleTitle}`);
            await this.clickAddModuleIcon();
            await this.enterModuleTitle(moduleTitle);
            await this.enterDescription(description);
            await this.clickSubmitButton();

            // Wait for popup to close
            // await this.moduleTitleTextBox.waitFor({state: "hidden",});
            logger.info(`Module '${moduleTitle}' added successfully.`);

        } 
        catch (error) {
            logger.error(`Failed to add module '${moduleTitle}': ${error}`);
            throw new Error(`Failed to add module '${moduleTitle}': ${error}`);
        }
    }

    async verifyModulePresent(moduleTitle: string): Promise<void> {
        try {
            logger.info(`Verifying module: ${moduleTitle}`);
            const moduleRow = this.moduleRows.filter({hasText: moduleTitle,}).first();
            await expect(moduleRow).toBeVisible({timeout: 10000,});
            logger.info(`Verified module '${moduleTitle}'.`);
        } 
        catch (error) {
            logger.error(`Module '${moduleTitle}' was not found: ${error}`);
            throw new Error(`Module '${moduleTitle}' was not found: ${error}`);
        }
    }
}