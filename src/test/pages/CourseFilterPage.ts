import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CourseFilterPage extends BasePage {

    readonly courseManagement: Locator;
    readonly filtersButton: Locator;
    readonly categoryDropdown: Locator;
    readonly courseCategory: Locator;
    readonly levelDropdown: Locator;
    readonly courseLevel: Locator;
    readonly sortByDropdown: Locator;
    readonly courseName: Locator;

    constructor(page: Page) {
        super(page);

        this.courseManagement = page.locator('[title="Course Management"]');
        this.filtersButton = page.getByRole('button', { name: 'Filters' });
        this.categoryDropdown = page.getByRole('combobox').nth(1);
        this.courseCategory = page.locator("//tbody/tr/td[4]");
        this.levelDropdown = page.getByRole('combobox').nth(2);
        this.courseLevel = page.locator("//table//th[contains(text(),'Level')]/parent::tr/following-sibling::tr/td[count(//table//th[contains(text(),'Level')]/preceding-sibling::th)+1]");
        this.sortByDropdown = page.getByRole('combobox').nth(3);
        this.courseName = page.locator("//tbody/tr/td[3]");
    }

    async clickCourseManagement() {
        await this.click(this.courseManagement);
    }

    async clickFilters() {
        await this.click(this.filtersButton);
    }

    async selectCategory(category: string) {
    await this.categoryDropdown.selectOption({ value: category });
    }

    async verifySelectedCategory(category: string) {
        const count = await this.courseCategory.count();
        for (let i = 0; i < count; i++) {
            await expect(this.courseCategory.nth(i)).toContainText(category);
        }
    }
    async clickLevelDropdown() {
        await this.levelDropdown.click();
    }

    async selectLevel(level: string) {
        await this.levelDropdown.selectOption({ value: level });
    }

    async verifySelectedLevel(level: string) {
        const count = await this.courseLevel.count();
        for (let i = 0; i < count; i++) {
            await expect(this.courseLevel.nth(i)).toContainText(level);
        }
    }
    async clickSortByDropdown() {
        await this.click(this.sortByDropdown);
    }
    async selectSortByCourseName() {
        await this.sortByDropdown.selectOption({ value: "courseName" });
    }
    async verifySortedByCourseName() {
        const count = await this.courseName.count();
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
            const nameText = await this.courseName.nth(i).innerText();
            names.push(nameText.trim());
        }
        for (let i = 1; i < names.length; i++) {
            const comparison = names[i - 1].localeCompare(names[i]);
            expect(comparison).toBeGreaterThanOrEqual(0);
        }
    }
}