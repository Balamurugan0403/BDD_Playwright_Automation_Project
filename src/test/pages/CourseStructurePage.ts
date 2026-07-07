import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CourseStructurePage extends BasePage {

    private readonly courseRow: Locator;
    private readonly addCourseStructureButton: Locator;
    private readonly addModuleIcon: Locator;
    private readonly moduleTitleTextBox: Locator;
    private readonly descriptionTextBox: Locator;
    private readonly addModuleBtn: Locator;
    private readonly successMsg: Locator;

    public static createdCourseId: string = "J-BTI-T-001";

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

        this.successMsg = this.page.locator("[class*='Toastify']");
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
        await this.addModuleBtn.click();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.successMsg).toBeVisible();
    }

    async verifyModulePresent(moduleTitle: string): Promise<void> {
        await expect(
            this.page.getByText(moduleTitle, { exact: true })
        ).toBeVisible();
    }
}