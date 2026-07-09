import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class AddCoursePage extends BasePage {

    private addCourseBtn = this.page.getByRole("button", { name: "Add Course" });
    private createNewCourseTab = this.page.locator("span", { hasText: "Create New Course Setup" });
    private courseClientDropdown = this.page.getByRole("combobox").nth(0);
    private serviceTypeDropdown = this.page.getByRole("combobox").nth(1);
    private serviceModelDropdown = this.page.getByRole("combobox").nth(2);
    private courseCategoryDropdown = this.page.getByRole("combobox").nth(3);
    private courseNameDropdown = this.page.getByRole("combobox").nth(4);
    private courseIdField = this.page.locator('input[data-slot="input"][readonly]').nth(1);
    private nextButton = this.page.getByRole("button", { name: "Next" });

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
}