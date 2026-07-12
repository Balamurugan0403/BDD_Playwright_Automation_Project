import { BasePage } from "./BasePage";
import { config } from "../../main/config/config";

export class DynamicFieldManagementPage extends BasePage {

    private categoryMenu = this.page.getByRole("button", { name: "Course Category" });
    private pedagogyMenu = this.page.getByRole("button", { name: "Pedagogy" });

    async openDynamicFieldManagement() {
        await this.goto(config.dynamicUrl);
        await this.categoryMenu.waitFor({ state: "visible", timeout: 15000 });
    }

    async openCategoryManagement() {
        await this.click(this.categoryMenu);
    }

    async openPedagogyManagement() {
        await this.pedagogyMenu.waitFor({ state: "visible", timeout: 15000 });
        await this.click(this.pedagogyMenu);
    }
}
