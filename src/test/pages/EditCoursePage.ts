import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class EditCoursePage extends BasePage {
    private searchInput = this.page.getByPlaceholder("Search courses, codes, clients, or categories...");
    private previewUpdateButton = this.page.getByRole("button", { name: "Preview & Update" });
    private saveButton = this.page.getByRole("button", { name: "Save Course Layout" });

    async searchCourse(term:string){
        logger.info(`Searching course ${term}`);
        await this.searchInput.fill(term);
        await this.page.waitForTimeout(2000);
    }

    private rowActionsButton(rowText:string){
        return this.page.locator("div").filter({ hasText:rowText }).locator('button:has(svg.lucide-ellipsis-vertical)').last();
    }

    async selectEditCourseOption(rowText:string){
        logger.info("Opening edit course menu");
        await this.rowActionsButton(rowText).click();
        const editButton = this.page.getByRole("button", { name:"Edit Course" });
        await expect(editButton).toBeVisible({ timeout:10000 });
        await editButton.click();
        await this.page.waitForTimeout(3000);
    }

    async clickPreviewAndUpdate(){
        await this.previewUpdateButton.click();
    }

    async clickSaveChanges(){
        await this.saveButton.click();
    }

    async verifyCourseUpdated(courseName:string){
        await expect(this.page.getByText(courseName, { exact:true })).toBeVisible({ timeout:20000 });
    }
}