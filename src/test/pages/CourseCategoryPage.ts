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
}
