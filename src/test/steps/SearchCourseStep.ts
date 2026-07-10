import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../main/support/CustomWorld';

When('the admin enters {string} in the course search bar', async function (this: CustomWorld, searchTerm: string) {
    await this.searchCoursePage.enterSearchTerm(searchTerm);
});

Then('the course list should display only courses matching {string}', async function (this: CustomWorld, searchTerm: string) {
    await this.searchCoursePage.verifySearchResultsMatch(searchTerm);
});