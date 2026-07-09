import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class AddCoursePage extends BasePage {

    // Course Basic Configuration
    private addCourseBtn = this.page.getByRole("button", { name: "Add Course" });
    private createNewCourseTab = this.page.locator("span", { hasText: "Create New Course Setup" });
    private courseClientDropdown = this.page.getByRole("combobox").nth(0);
    private serviceTypeDropdown = this.page.getByRole("combobox").nth(1);
    private serviceModelDropdown = this.page.getByRole("combobox").nth(2);
    private courseCategoryDropdown = this.page.getByRole("combobox").nth(3);
    private courseNameDropdown = this.page.getByRole("combobox").nth(4);
    private courseIdField = this.page.locator('input[data-slot="input"][readonly]').nth(1);
    private nextButton = this.page.getByRole("button", { name: "Next" });

    // Course Hierarchy and Layout
    private courseLevelDropdown = this.page.getByRole("combobox").nth(0);
    private descriptionBox = this.page.locator('div.tiptap[contenteditable="true"]');

    private moduleCheckbox = this.page.locator("#module-checkbox");
    private submoduleCheckbox = this.page.locator("#submodule-checkbox");
    private topicCheckbox = this.page.locator("#topic-checkbox");
    private subtopicCheckbox = this.page.locator("#subtopic-checkbox");

    private iDoDropdown = this.page.getByRole("combobox").nth(1);
    private weDoDropdown = this.page.getByRole("combobox").nth(2);
    private youDoDropdown = this.page.getByRole("combobox").nth(3);

    private previousButton = this.page.getByRole("button", { name: "Previous" });
    private previewCreateButton = this.page.getByRole("button", { name: "Preview & Create" });

    // Course Basic Configuration methods
    async clickAddCourse() {
        await this.addCourseBtn.waitFor({ state: "visible", timeout: 10000 });
        await this.click(this.addCourseBtn);
    }

    async verifyCreateNewCourseTab() {
        await expect(this.createNewCourseTab).toBeVisible({ timeout: 10000 });
    }

    async selectCourseClient(client: string) {
        await this.courseClientDropdown.click();
        await this.page.getByRole("option", { name: client, exact: true }).click();
    }

    async selectServiceType(type: string) {
        await this.serviceTypeDropdown.click();
        await this.page.getByRole("option", { name: type, exact: true }).click();
    }

    async selectServiceModel(model: string) {
        await this.serviceModelDropdown.click();
        await this.page.getByRole("option", { name: model, exact: true }).click();
    }

    async selectCourseCategory(category: string) {
        await this.courseCategoryDropdown.click();
        await this.page.getByRole("option", { name: category, exact: true }).click();
    }

    async selectCourseName(course: string) {
        await this.courseNameDropdown.click();
        await this.page.getByRole("option", { name: course, exact: true }).click();
        await this.page.waitForLoadState("networkidle");
    }

    async fillCourseBasicConfiguration(data: any) {
        await this.selectCourseClient(data.courseClient);
        await this.selectServiceType(data.serviceType);
        await this.selectServiceModel(data.serviceModel);
        await this.selectCourseCategory(data.courseCategory);
        await this.selectCourseName(data.courseName);
    }

    async verifyCourseIdGenerated() {
        await expect(this.courseIdField)
            .toHaveValue(/.+/, { timeout: 15000 });
    }

    async clickNext() {
        await this.click(this.nextButton);
    }

    async verifyCourseHierarchyTab() {
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

    async checkTopic() {
        await this.check(this.topicCheckbox);
    }

    async checkSubtopic() {
        await this.check(this.subtopicCheckbox);
    }

    async selectIDo(value: string) {
        await this.iDoDropdown.click();
        await this.page.getByRole("option", { name: value, exact: true }).click();
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
        const skillCheckbox = this.page.locator("label", { hasText: skillName }).locator('input[type="checkbox"]');
        await this.check(skillCheckbox);
    }

    async fillCourseHierarchyAndLayout(data: any) {
        await this.selectCourseLevel(data.courseLevel);
        await this.enterDescription(data.description);
        await this.checkModule();
        await this.selectIDo(data.iDo);
        await this.selectWeDo(data.weDo);
        await this.selectYouDo(data.youDo);

        for (const skill of data.skills) {
            await this.selectSkill(skill);
        }
    }

    async clickPrevious() {
        await this.click(this.previousButton);
    }

    async clickPreviewAndCreate() {
        await this.click(this.previewCreateButton);
    }
}