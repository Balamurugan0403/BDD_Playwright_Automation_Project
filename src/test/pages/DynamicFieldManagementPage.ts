import { BasePage } from "./BasePage";

export class DynamicFieldManagementPage extends BasePage {

    private categoryMenu = this.page.getByRole("button", { name: "Course Category" });

    async openDynamicFieldManagement() {
        await this.goto("https://lms-smartcliff.vercel.app/lms/pages/dynamicfieldsettings");
        // make sure the page (and the auth-guarded content) has actually loaded
        await this.categoryMenu.waitFor({ state: "visible", timeout: 15000 });
    }

    async openCategoryManagement() {
        await this.click(this.categoryMenu);
    }
}
