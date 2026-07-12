import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class CourseCategoryPage extends BasePage {

    private addCategoryBtn = this.page.getByRole("button", { name: "Add Category" });
    private categoryName = this.page.getByRole('textbox', { name: /Enter category name/i })
    private courseName = this.page.getByRole('textbox', { name: /Type course name and press Enter\.\.\./i })
    private description = this.page.getByRole('textbox', { name: /Enter category description/i })
    private createCategory = this.page.getByRole('button', { name: /Create Category/i })
    private successmessage = this.page.getByRole('heading', { name: 'Category Created Successfully' });
    private CategorySearchBox = this.page.getByRole('textbox', { name: 'Search by name, description, code or courses...' });
    private editOption = this.page.getByText('Edit', { exact: true });
    private deleteOption = this.page.getByText('Delete', { exact: true });
    private saveButton = this.page.getByRole('button', { name: 'Update Category' });
    private confirmDeleteButton = this.page.getByRole('button', { name: 'Delete', exact: true });
    private closeToastBtn = this.page.locator(".lucide.lucide-x.w-5.h-5");
    private noDataMessage = this.page.getByText('No users found', { exact: true });

    private getActionButton(categoryName: string) {
        return this.page.locator('tr', { hasText: categoryName }).locator('button[data-slot="dropdown-menu-trigger"]');
    }

    async clickAddCategory() {
        logger.info("Clicking Add Category button");
        await this.addCategoryBtn.waitFor({ state: "visible", timeout: 10000 });
        await this.click(this.addCategoryBtn);
    }
    async enterCategoryName(name: string) {
        await this.categoryName.waitFor({ state: "visible", timeout: 10000 });
        await this.fill(this.categoryName, name);
    }

    async selectCourse(course: string) {
        await this.courseName.waitFor({ state: "visible", timeout: 10000 });
        await this.fill(this.courseName, course);
        await this.page.keyboard.press("Enter");
    }

    async enterDescription(description: string) {
        await this.fill(this.description, description);
    }

    async clickCreateCategory() {
        logger.info("Clicking Create Category button");
        await this.click(this.createCategory);
    }

    async verifyCategoryCreated() {
        logger.info("Verifying Category Created Successfully message");
        await expect(this.successmessage).toBeVisible({ timeout: 10000 });
        logger.info("Category created successfully");
    }

   async enterCategorySearch(category: string) {
    logger.info(`Searching category: ${category}`);
    await this.fill(this.CategorySearchBox, category);
    await this.CategorySearchBox.press("Enter");
}

async verifyCategorySearchKey(categoryName: string, courseName: string) {
    logger.info("Verifying category is displayed in the category list");
    const categoryLocator = this.page.getByText(categoryName, { exact: true });
    const courseLocator = this.page.getByText(courseName, { exact: true });
    await expect(categoryLocator).toBeVisible({ timeout: 20000 }); 
    await expect(courseLocator).toBeVisible({ timeout: 20000 });
    logger.info("Category displayed successfully");
}

async clickActionButton(categoryName: string) {
    logger.info(`Clicking Action button for category: ${categoryName}`);
    const actionBtn = this.getActionButton(categoryName);
    await actionBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.click(actionBtn);
}

async clickEditOption() {
    logger.info("Clicking Edit option");
    await this.editOption.waitFor({ state: "visible", timeout: 10000 });
    await this.click(this.editOption);
}

async updateDescription(newDescription: string) {
    logger.info(`Updating category description to: ${newDescription}`);
    await this.description.waitFor({ state: "visible", timeout: 10000 });
    await this.fill(this.description, newDescription);
}

async clickSaveButton() {
    logger.info("Clicking Save button");
    await this.click(this.saveButton);
}

async clickDeleteOption() {
    logger.info("Clicking Delete option");
    await this.deleteOption.waitFor({ state: "visible", timeout: 10000 });
    await this.click(this.deleteOption);
}

async clickConfirmDelete() {
    logger.info("Clicking Confirm Delete button");
    await this.confirmDeleteButton.waitFor({ state: "visible", timeout: 10000 });
    await this.click(this.confirmDeleteButton);

    logger.info("Waiting a few seconds after delete");
    await this.page.waitForTimeout(5000);

    logger.info("Closing the confirmation toast if it appears");
    try {
        await this.closeToastBtn.waitFor({ state: "visible", timeout: 5000 });
        await this.click(this.closeToastBtn);
    } catch {
        logger.info("Toast close icon not found, continuing without closing it");
    }
}

async verifyNoDataFound() {
    logger.info("Verifying No Data Found message after delete");
    await expect(this.noDataMessage).toBeVisible({ timeout: 10000 });
    logger.info("Category deleted successfully, no data found");
}

}