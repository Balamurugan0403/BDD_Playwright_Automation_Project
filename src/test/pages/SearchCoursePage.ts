import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class SearchCoursePage extends BasePage {
    private searchBox = this.page.getByPlaceholder("Search courses, codes, clients, or categories...");
    private courseRows = this.page.locator("tbody tr");

    async enterSearchTerm(searchTerm: string) {
        try {
            logger.info(`Entering search term: ${searchTerm}`);
            await this.searchBox.waitFor({ state: "visible", timeout: 10000 });
            await this.fill(this.searchBox, searchTerm);
            await this.searchBox.press("Enter");
            logger.info(`Search term '${searchTerm}' entered successfully.`);
        }
        catch (error) {
            logger.error(`Failed to enter search term '${searchTerm}': ${error}`);
            throw new Error(`Failed to enter search term '${searchTerm}': ${error}`);
        }
    }

    async verifySearchResultsMatch(searchTerm: string) {
        try {
            logger.info(`Verifying search results match: ${searchTerm}`);

            // Wait for the table to settle after filtering
            await this.page.waitForTimeout(1000); // brief buffer for re-render
            await this.courseRows.first().waitFor({ state: "visible", timeout: 10000 });

            // Re-check row count only after rows have real text (avoids empty/loading rows)
            await expect(async () => {
                const count = await this.courseRows.count();
                for (let i = 0; i < count; i++) {
                    const text = await this.courseRows.nth(i).innerText();
                    expect(text.trim().length).toBeGreaterThan(0);
                }
            }).toPass({ timeout: 10000 });

            const count = await this.courseRows.count();
            for (let i = 0; i < count; i++) {
                await expect(this.courseRows.nth(i)).toContainText(searchTerm, { ignoreCase: true });
            }
            logger.info(`All ${count} row(s) matched search term '${searchTerm}'.`);
        }
        catch (error) {
            logger.error(`Search results did not match '${searchTerm}': ${error}`);
            throw new Error(`Search results did not match '${searchTerm}': ${error}`);
        }
    }
}