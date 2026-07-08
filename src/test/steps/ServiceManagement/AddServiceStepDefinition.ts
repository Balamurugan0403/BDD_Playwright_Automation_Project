import {Given, When, Then} from '@cucumber/cucumber'
import { CustomWorld } from '../../../main/support/CustomWorld';
import { addService } from '../../../main/types/AddService';


Given('the user logged in as admin', async function (this: CustomWorld) {
    await this.loginPage.login();
});

When('the user clicks the Add service button', async function (this: CustomWorld) {
    await this.serviceModelPage.clickAddService()
});

When('the user fill the name and description', async function (this: CustomWorld, dataTable) {
    const data = dataTable.hashes()[0] as addService;

    await this.serviceModelPage.enterServiceName(data.name);
    await this.serviceModelPage.enterServiceDescription(data.description);
});

When('the user clicks the create service button', async function (this: CustomWorld) {
    await this.serviceModelPage.clickCreateService();
});

Then('the popup alert should be displayed as {string}', async function (this: CustomWorld, string) {
    await this.serviceModelPage.verifyCategoryCreated(string);
});

When('the user clicks the {string} option from the sidebar', async function (this: CustomWorld, string) {
    await this.sidebarPage.clickSidebarOption(string);
});

When('the user clicks the Add Course button', async function (this: CustomWorld) {

});

When('the user clicks the Service type dropdown', async function (this: CustomWorld) {
  
});

Then('the user should see the added service as option', async function (this: CustomWorld) {
    
});

When('the user fill the service name as {string}', async function (this: CustomWorld, string) {
  
});

When('the user fill the service description as {string}', async function (this: CustomWorld, string) {
  
});

Then('the validation message should be displayed as {string}', async function (this: CustomWorld, string) {
  
});