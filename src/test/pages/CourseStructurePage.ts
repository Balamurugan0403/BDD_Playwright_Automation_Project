import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class CourseStructurePage extends BasePage {
    public static createdCourseId: string = "APL-AT-A-001";
    private courseRow = this.page.locator("tbody tr").filter({hasText: CourseStructurePage.createdCourseId,});
    private addCourseStructureButton = this.courseRow.getByRole("button", { name: "Add Course Structure",});
    private searchBox = this.page.getByPlaceholder("Search courses, codes, clients, or categories...");
    private addModuleIcon = this.page.getByTitle("Add module");
    private moduleTitleTextBox =this.page.getByPlaceholder("Enter title...");
    private descriptionTextBox =this.page.getByPlaceholder("Brief description ...");
    private skillCheckbox = (skill: string) =>this.page.locator(`//label[normalize-space(text())='${skill}']//input[@type='checkbox']`);
    private submitBtn =this.page.locator("//button[@type='submit']");
    private successMsg = this.page.locator("text=Operation completed successfully!");
    private moduleRows =this.page.locator("tbody tr");
    private titleValidationError = this.page.getByText("Title is required for module");
    //private moduleTitleLocator = (moduleTitle: string): Locator => this.page.locator("tbody").locator(`xpath=.//span[normalize-space()='${moduleTitle}']`);

    async searchCourse(courseId: string){
        try {
            await this.searchBox.waitFor({ state: "visible", timeout: 100000 });
            await this.fill(this.searchBox, courseId);
            await this.searchBox.press("Enter");

            await expect(this.courseRow).toBeVisible({ timeout: 100000 });
            logger.info(`Course '${courseId}' found.`);
        } 
        catch (error) {
            logger.error(`Failed to search course '${courseId}': ${error}`);
            throw new Error(`Failed to search course '${courseId}': ${error}`);
        }
    }

    async clickAddCourseStructure(){
        try {
            await this.addCourseStructureButton.waitFor({state: "visible",timeout: 10000});
            await this.click(this.addCourseStructureButton);
            logger.info("Navigated to adding course structure page");
        } 
        catch (error) {
            logger.error(`Failed to click Add Course Structure button: ${error}`);
            throw new Error(`Failed to click Add Course Structure button: ${error}`);
        }
    }

    async clickAddModuleIcon(){
        try {
            await this.addModuleIcon.waitFor({state: "visible",timeout: 10000});
            await this.click(this.addModuleIcon)
            logger.info("Clicked Add Module icon.");

        } 
        catch (error) {
            logger.error(`Failed to click Add Module icon: ${error}`);
            throw new Error(`Failed to click Add Module icon: ${error}`);
        }
    }

    async enterModuleTitle(moduleTitle: string){
        try {
            await this.moduleTitleTextBox.waitFor({state: "visible",timeout:10000});
            await this.fill(this.moduleTitleTextBox, moduleTitle)
            logger.info(`Module title '${moduleTitle}' entered successfully.`);
        } 
        catch (error) {
            logger.error(`Failed to enter module title '${moduleTitle}': ${error}`);
            throw new Error(`Failed to enter module title '${moduleTitle}': ${error}`);
        }
    }

    async enterDescription(description: string){
        try {
            await this.fill(this.descriptionTextBox, description);
            logger.info("Module description entered successfully.");
        } 
        catch (error) {
            logger.error(`Failed to enter module description: ${error}`);
            throw new Error(`Failed to enter module description: ${error}`);
        }
    }

    async selectSkills(skills: string[]){
        try {
            logger.info(`Selecting Skills: ${skills.join(", ")}`);
            for (const skill of skills) {
                const checkbox = this.skillCheckbox(skill);
                await checkbox.waitFor({ state: "visible" });
                await checkbox.check();
            }
            logger.info("Skills selected");
        } 
        catch (error) {
            logger.error(`Failed to select skills: ${error}`);
            throw error;
        }
    }

    async clickSubmitButton(){
        try {
            await this.submitBtn.waitFor({state: "visible",timeout: 10000});
            await this.click(this.submitBtn);
        } 
        catch (error) {
            logger.error(`Failed to click Submit button: ${error}`);
            throw new Error(`Failed to click Submit button: ${error}`);
        }
    }
    public async getModuleCount() {
        return await this.courseRow.count();
    }

    public async verifyModuleCountIncreased(previousCount: number){
        await expect(this.getModuleCount).toBe(previousCount+1);
    }
    
    async addModule(moduleTitle: string, description: string, skills: string[]){
        try {
            logger.info(`Adding module: ${moduleTitle}`);
            await this.clickAddModuleIcon();
            await this.enterModuleTitle(moduleTitle);
            await this.enterDescription(description);
            await this.selectSkills(skills);
            await this.clickSubmitButton();
            logger.info(`Module '${moduleTitle}' added successfully.`);

        } 
        catch (error) {
            logger.error(`Failed to add module '${moduleTitle}': ${error}`);
            throw new Error(`Failed to add module '${moduleTitle}': ${error}`);
        }
    }

    async addModuleWithoutTitle(){
        try {
            await this.clickAddModuleIcon();
            await this.clickSubmitButton();
            logger.info("Module added without mandatory fields")
        } 
        catch (error) {
            logger.error(`Failed to add module without title: ${error}`);
            throw new Error(`Failed to add module without title: ${error}`);
        }
    }

    async verifySuccessMessage(){
        try {
            await this.successMsg.waitFor({state: "visible",timeout: 10000});
            await expect(this.successMsg).toContainText("Operation completed successfully!");
            logger.info("Module added success message displayed");
        } 
        catch (error) {
            logger.error(`Failed to verify success message: ${error}`);
            throw new Error(`Failed to verify success message: ${error}`);
        }
    }
    
    async verifyTitleValidationMessage(){
        try {
            await expect(this.titleValidationError).toBeVisible();
            await expect(this.titleValidationError).toHaveText("Title is required for module");
            logger.info("Mandatory field required error message displayed")
        } 
        catch (error) {
            logger.error(`Failed to verify mandatory field validation message: ${error}`);
            throw new Error(`Failed to verify mandatory field validation message: ${error}`);
        }
    }


    async verifyModulePresent(moduleTitle: string){
        try {
            const moduleRow = this.moduleRows.filter({hasText: moduleTitle,}).first();
            await expect(moduleRow).toBeVisible({timeout: 10000,});
            logger.info(`Module '${moduleTitle}' is present.`);
        } 
        catch (error) {
            logger.error(`Module '${moduleTitle}' was not found: ${error}`);
            throw new Error(`Module '${moduleTitle}' was not found: ${error}`);
        }
    }
}