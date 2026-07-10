import { expect } from 'playwright/test';
import { CustomWorld } from './../../../main/support/CustomWorld';
import {When, Then} from '@cucumber/cucumber'
import { getServiceData } from '../../../resources/data/AddServiceData';

When('the user enter the service name in the search field in {string}', async function (this: CustomWorld, string) {
    
    this.service = getServiceData();

    if(string === 'normal') await this.serviceModelPage.enterServiceKey(this.service!.name);
    else if(string === 'upper') await this.serviceModelPage.enterServiceKey(this.service!.name.toUpperCase());
    else await this.serviceModelPage.enterServiceKey(this.service!.name.toLowerCase());
});

Then('the services matching to the service name should be displyed', async function (this: CustomWorld) {
    expect(await this.serviceModelPage.verifySearchResults(this.service!.name)).toBeTruthy(); 
});

When('the user enter the different service name in the search field', async function (this: CustomWorld) {
    await this.serviceModelPage.enterServiceKey(getServiceData()?.name);
});

Then('the message should be displayed as {string}', async function (this: CustomWorld, string) {
    expect(await this.serviceModelPage.verifyFoundMessage(string)).toBeTruthy()
});