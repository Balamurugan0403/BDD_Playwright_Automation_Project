import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CourseCategoryPage extends BasePage {

    private addCategoryBtn = this.page.getByRole("button", { name: "Add Category" });
    private categoryName = this.page.getByRole('textbox', { name: /Enter category name/i })
    private courseName = this.page.getByRole('textbox', { name: /Type course name and press Enter\.\.\./i })
    private description = this.page.getByRole('textbox', { name: /Enter category description/i })
    private createCategory = this.page.getByRole('button', { name: /Create Category/i })
    private successmessage = this.page.getByRole('heading', { name: 'Category Created Successfully' });

    async clickAddCategory() {
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
        await this.click(this.createCategory);
    }

    async verifyCategoryCreated() {
        await expect(this.successmessage).toBeVisible({ timeout: 10000 });
    }
}
