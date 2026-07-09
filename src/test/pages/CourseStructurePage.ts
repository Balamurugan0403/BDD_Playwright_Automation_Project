import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class CourseStructurePage extends BasePage {
    private readonly courseRow: Locator;
    private readonly addCourseStructureButton: Locator;
    private readonly searchBox: Locator;
    private readonly addModuleIcon: Locator;
    private readonly moduleTitleTextBox: Locator;
    private readonly descriptionTextBox: Locator;
    private readonly submitBtn: Locator;
    private readonly successMsg: Locator;
    private readonly moduleRows: Locator;
    private readonly titleValidationError: Locator;

    public static createdCourseId: string = "PT-BTI-H-005";

    constructor(page: Page) {
        super(page);
        this.courseRow = this.page.locator("tbody tr").filter({hasText: CourseStructurePage.createdCourseId,});
        this.addCourseStructureButton = this.courseRow.getByRole("button", { name: "Add Course Structure",});
        this.searchBox = this.page.getByPlaceholder("Search courses, codes, clients, or categories...");
        this.addModuleIcon = this.page.getByTitle("Add module");
        this.moduleTitleTextBox =this.page.getByPlaceholder("Enter title...");
        this.descriptionTextBox =this.page.getByPlaceholder("Brief description ...");
        this.submitBtn =this.page.locator("//button[@type='submit']");
        this.successMsg = this.page.getByText("Operation completed successfully!");
        this.moduleRows =this.page.locator("tbody tr");
        this.titleValidationError = this.page.getByText("Title is required for module");
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

    async searchCourse(courseId: string): Promise<void> {
        try {
            logger.info(`Searching course: ${courseId}`);

            await this.searchBox.waitFor({ state: "visible" });
            await this.searchBox.fill(courseId);
            await this.searchBox.press("Enter");

            await expect(this.courseRow).toBeVisible({ timeout: 10000 });

            logger.info(`Course '${courseId}' found.`);
        } catch (error) {
            logger.error(`Failed to search course '${courseId}': ${error}`);
            throw new Error(`Failed to search course '${courseId}': ${error}`);
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

    async addModuleWithoutTitle(): Promise<void> {
        try {
            logger.info("Adding module without title");
            await this.clickAddModuleIcon();
            await this.clickSubmitButton();
        } 
        catch (error) {
            logger.error(`Failed to add module without title: ${error}`);
            throw new Error(`Failed to add module without title: ${error}`);
        }
    }

    async verifySuccessMessage(): Promise<void> {
        try {
            logger.info("Verifying Success Message");
            await expect(this.successMsg).toContainText("Operation completed successfully!");
            logger.info("Success message verified successfully");
        } 
        catch (error) {
            logger.error(`Failed to verify success message: ${error}`);
            throw new Error(`Failed to verify success message: ${error}`);
        }
    }
    
    async verifyTitleValidationMessage(): Promise<void> {
        try {
            logger.info("Verifying Title Validation Message");
            await expect(this.titleValidationError).toBeVisible();
            await expect(this.titleValidationError).toHaveText("Title is required for module");
        } 
        catch (error) {
            logger.error(`Failed to verify title validation message: ${error}`);
            throw new Error(`Failed to verify title validation message: ${error}`);
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