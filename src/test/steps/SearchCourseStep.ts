import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../main/support/CustomWorld';
import { faker } from '@faker-js/faker';

When('the admin enters {string} in the course search bar', async function (this: CustomWorld, searchTerm: string) {
    await this.searchCoursePage.enterSearchTerm(searchTerm);
});

Then('the course list should display only courses matching {string}', async function (this: CustomWorld, searchTerm: string) {
    await this.searchCoursePage.verifySearchResultsMatch(searchTerm);
});

When('the admin enters a random search term in the course search bar', async function (this: CustomWorld) {
    const randomSearchTerm = faker.string.alphanumeric(12);
    await this.searchCoursePage.enterSearchTerm(randomSearchTerm);
});

Then('no courses should be displayed in the course list', async function (this: CustomWorld) {
    await this.searchCoursePage.verifyNoResultsDisplayed();
});