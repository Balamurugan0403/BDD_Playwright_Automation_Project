import {Given, When, Then} from '@cucumber/cucumber'
import { CustomWorld } from '../../../main/support/CustomWorld'
import ServiceModelData from '../../../resources/data/ServiceModelData.json'

When('the user clicks the click to view button in the search result', async function (this: CustomWorld)  {
    this.serviceModelPage.clickClickToView();
})

When('the user fill the {string} service model details', async function (this: CustomWorld, testcase: string)  {
    const data = ServiceModelData[testcase as keyof typeof ServiceModelData];

    this.serviceModelPage.enterModelName(data.name);
    this.serviceModelPage.enterModelDescription(data.Description);
})

When('the user clicks the create model button', async function (this: CustomWorld)  {
    this.serviceModelPage.clickCreateModel();
})

Then('the validation message should be displayed as {string}', async function (this: CustomWorld, expectedMessage: string)  {
    if(expectedMessage === "Validation Error") {
        this.serviceModelPage.verifyValidityOfModelForm();
    }  
    else {
        this.serviceModelPage.verifyModelCreated(expectedMessage);
    }
})

When('the user clicks the Add model button', async function (this: CustomWorld)  {
    this.serviceModelPage.clickAddModel();
})
