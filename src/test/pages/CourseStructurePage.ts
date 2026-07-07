import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

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
        await this.page.goto("https://lms-smartcliff.vercel.app/lms/pages/coursestructure");
    }

    async clickAddCourseStructure(): Promise<void> {
        await this.addCourseStructureButton.waitFor({ state: "visible" });
        await this.addCourseStructureButton.click();
    }

    async clickAddModuleIcon(): Promise<void> {
        await this.addModuleIcon.waitFor({ state: "visible" });
        await this.addModuleIcon.click();
    }

    async enterModuleTitle(moduleTitle: string): Promise<void> {
        await this.moduleTitleTextBox.fill(moduleTitle);
    }

    async enterDescription(description: string): Promise<void> {
        await this.descriptionTextBox.fill(description);
    }

    async clickAddModuleButton(): Promise<void> {
        await this.saveBtn.click();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.successMsg).toBeVisible({ timeout: 10000 });
    }

    async verifyModulePresent(moduleTitle: string): Promise<void> {
        const moduleRow = this.moduleRows.filter({ hasText: moduleTitle }).first();
        await expect(moduleRow).toBeVisible();
    }
}