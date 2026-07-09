import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class AddCoursePage extends BasePage {
    // Course Basic Configuration
    private addCourseBtn = this.page.getByRole("button", { name: "Add Course" });
    private courseClientDropdown = this.page.getByRole("combobox").nth(0);
    private serviceTypeDropdown = this.page.getByRole("combobox").nth(1);
    private serviceModelDropdown = this.page.getByRole("combobox").nth(2);
    private courseCategoryDropdown = this.page.getByRole("combobox").nth(3);
    private courseNameDropdown = this.page.getByRole("combobox").nth(4);
    private courseIdField = this.page.locator("input[readonly]").first();
    private nextButton = this.page.getByRole("button", { name: "Next" });
    private validationErrorMessage = this.page.locator("div.text-red-600 span");

    // Course Hierarchy and Layout
    private courseLevelDropdown = this.page.getByRole("combobox").nth(0);
    private descriptionBox = this.page.locator('div.tiptap[contenteditable="true"]');

    private moduleCheckbox = this.page.locator("#module-checkbox");
    private submoduleCheckbox = this.page.locator("#submodule-checkbox");
    private topicCheckbox = this.page.locator("#topic-checkbox");
    private subtopicCheckbox = this.page.locator("#subtopic-checkbox");

    private iDoDropdown = this.page.locator('div.space-y-2').filter({ has: this.page.getByText('I Do', { exact: true }) }).locator('button[role="combobox"]');
    private weDoDropdown = this.page.locator('div.space-y-2').filter({ has: this.page.getByText('We Do', { exact: true }) }).locator('button[role="combobox"]');
    private youDoDropdown = this.page.locator('div.space-y-2').filter({ has: this.page.getByText('You Do', { exact: true }) }).locator('button[role="combobox"]');

    // Resource Type panel (appears after selecting a pedagogy value)
    private resourceTypeIDoTab = this.page.getByRole("button", { name: /^I Do/ });
    private resourceTypeWeDoTab = this.page.getByRole("button", { name: /^We Do/ });
    private resourceTypeYouDoTab = this.page.getByRole("button", { name: /^You Do/ });

    private previewCreateButton = this.page.getByRole("button", { name: "Preview & Create" });
    private coursePreviewHeading = this.page
        .getByRole("heading", { name: "Course Layout Preview" })
        .last();
    private createCourseBtn = this.page.getByRole("button", { name: "Save Course Layout" });
    private successMessage = this.page.getByText("Course created successfully", { exact: false });

    // Course Basic Configuration methods
    async clickAddCourse() {
        logger.info("clicking the ADD COURSE button");
        await this.addCourseBtn.waitFor({ state: "visible", timeout: 100000 });
        await this.click(this.addCourseBtn);
    }

    async verifyTabVisible(tabName: string) {
        await expect(this.page.locator("span", { hasText: tabName })).toBeVisible({ timeout: 100000 });
    }

    async selectCourseClient(client: string) {
        await this.courseClientDropdown.click();
        await this.page.getByRole("option", { name: client, exact: true }).click();
    }

    async clickServiceDropdown() {
        await this.serviceTypeDropdown.click();
    }

    async selectServiceType(type: string) {
        await this.clickServiceDropdown();
        await this.page.getByRole("option", { name: type, exact: true }).click();
    }

    async verifyServiceOptionAvailable(serviceName: string) {
        logger.info(`verifying "${serviceName}" option is available in service type dropdown`);
        await expect(this.page.getByRole("option", { name: serviceName, exact: true })).toBeVisible({ timeout: 10000 });
    }

    async selectServiceModel(model: string) {
        await this.serviceModelDropdown.click();
        await this.page.getByRole("option", { name: model, exact: true }).click();
    }

    async selectCourseCategory(category: string) {
        await this.courseCategoryDropdown.click();
        await this.page.getByRole("option", { name: category, exact: true }).click();
    }

    async clickCourseCategoryDropdown() {
        logger.info("clicking the course category dropdown");
        await this.click(this.courseCategoryDropdown);
    }

    async verifyCategoryAvailable(category: string) {
        logger.info(`verifying "${category}" option is available in course category dropdown`);
        await expect(this.page.getByRole("option", { name: category, exact: true })).toBeVisible({ timeout: 10000 });
    }

    async selectCourseName(course: string) {
        await this.courseNameDropdown.click();
        await this.page.getByRole("option", { name: course, exact: true }).click();
    }

    async fillCourseBasicConfiguration(data: any) {
        logger.info("filling the course basic configuration details");
        await this.selectCourseClient(data.courseClient);
        await this.selectServiceType(data.serviceType);
        await this.selectServiceModel(data.serviceModel);
        await this.selectCourseCategory(data.courseCategory);
        await this.selectCourseName(data.courseName);
    }

    async clickNext() {
        await this.click(this.nextButton);
    }

    async verifyValidationErrorDisplayed() {
        logger.info("verifying validation error message is displayed");
        await expect(this.validationErrorMessage.first()).toBeVisible({ timeout: 10000 });
    }

    async verifyCourseHierarchyTab() {
        logger.info("moved to the course hierarchy tab");
        await expect(this.page.getByText("Course Hierarchy and Layout", { exact: true }).first()).toBeVisible({ timeout: 10000 });
    }

    // Course Hierarchy and Layout methods
    async selectCourseLevel(level: string) {
        await this.courseLevelDropdown.click();
        await this.page.getByRole("option", { name: level, exact: true }).click();
    }

    async enterDescription(text: string) {
        await this.descriptionBox.click();
        await this.descriptionBox.fill(text);
    }

    async checkModule() {
        await this.check(this.moduleCheckbox);
    }

    async checkSubmodule() {
        await this.check(this.submoduleCheckbox);
    }
    async selectIDo(value: string) {
        await this.iDoDropdown.click();

        await this.page.waitForTimeout(1000);

        const option = this.page.getByText(value, { exact: true }).last();

        await expect(option).toBeVisible({ timeout: 10000 });

        await option.click();
    }
    async selectWeDo(value: string) {
        await this.weDoDropdown.click();
        await this.page.getByRole("option", { name: value, exact: true }).click();
    }

    async selectYouDo(value: string) {
        await this.youDoDropdown.click();
        await this.page.getByRole("option", { name: value, exact: true }).click();
    }

    async selectSkill(skillName: string) {
        const skillCheckbox = this.page.getByRole("checkbox", { name: new RegExp(`\\b${skillName}\\b`) }).first();

        await this.check(skillCheckbox);
    }

    // Resource Type panel methods
    async switchResourceTab(tabName: "I Do" | "We Do" | "You Do") {
        logger.info(`switching to "${tabName}" resource type tab`);

        await this.page.getByText(tabName, { exact: true }).last().click();
    }

    async toggleResourceType(resourceName: string) {
        logger.info(`toggling resource type "${resourceName}"`);
        const row = this.page
            .locator('div', { hasText: resourceName })
            .filter({ has: this.page.locator('button[role="switch"]') })
            .last();
        await row.locator('button[role="switch"]').click();
    }

    async verifyResourceTypeState(resourceName: string, expectedOn: boolean) {
        logger.info(`verifying resource type "${resourceName}" is ${expectedOn ? "ON" : "OFF"}`);
        const row = this.page
            .locator('div', { hasText: resourceName })
            .filter({ has: this.page.locator('button[role="switch"]') })
            .last();
        await expect(row.locator('button[role="switch"]')).toHaveAttribute(
            "aria-checked",
            expectedOn ? "true" : "false"
        );
    }

    async setResourceTypesForTab(tabName: "I Do" | "We Do" | "You Do", resourceNames: string[]) {
        logger.info(`setting resource types for "${tabName}" tab: ${resourceNames.join(", ")}`);
        await this.switchResourceTab(tabName);
        for (const resource of resourceNames) {
            await this.toggleResourceType(resource);
        }
    }

    async fillCourseHierarchyAndLayout(data: any) {
        logger.info("filling the course hierarchy and layout details");
        await this.selectCourseLevel(data.courseLevel);
        await this.enterDescription(data.description);
        await this.checkModule();
        await this.selectIDo(data.iDo);

        if (data.resourceTypes) {
            if (data.resourceTypes.iDo) {
                await this.setResourceTypesForTab("I Do", data.resourceTypes.iDo);
            }

            for (const skill of data.skills) {
                await this.selectSkill(skill);
            }
        }
    }

    async clickPreviewAndCreate() {
        await this.click(this.previewCreateButton);
    }

    async verifyCourseLayoutPreview() {
        logger.info("verifying course layout preview is displayed");
        await expect(this.coursePreviewHeading).toBeVisible({ timeout: 15000 });
    }
    async clickCreateCourse() {
        logger.info("clicking the Create Course button");
        await this.click(this.createCourseBtn);
    }

    async verifySuccessMessage() {
        logger.info("verifying success message is displayed");
        await expect(this.successMessage).toBeVisible({ timeout: 15000 });
    }
}