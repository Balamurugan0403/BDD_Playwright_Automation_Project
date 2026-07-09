import {Given, When, Then} from '@cucumber/cucumber'
import { CustomWorld } from '../../../main/support/CustomWorld';
import { getServiceData } from '../../../resources/data/AddServiceData';
import { expect } from 'playwright/test';
import loginData from '../../../resources/data/loginData.json'

Given('the user logged in as admin', async function (this: CustomWorld) {
    await this.loginPage.login(loginData.validlogin.email, loginData.validlogin.password);
});

When('the user clicks the Add service button', async function (this: CustomWorld) {
    await this.serviceModelPage.clickAddService()
});

When('the user fill the name and description', async function (this: CustomWorld) {
    this.service = getServiceData();
    await this.serviceModelPage.enterServiceName(this.service.name);
    await this.serviceModelPage.enterServiceDescription(this.service.description);
});

When('the user fill the same name and description', async function (this: CustomWorld) {
    await this.serviceModelPage.enterServiceName(this.service!.name);
    await this.serviceModelPage.enterServiceDescription(this.service!.description);
});

When('the user clicks the create service button', async function (this: CustomWorld) {
    await this.serviceModelPage.clickCreateService();
});

Then('the popup alert should be displayed as {string}', async function (this: CustomWorld, string) {
    if(string === "Service created successfully")
        await this.serviceModelPage.verifyServiceCreated(string);
    else 
        await this.serviceModelPage.verifyErrorMessageDisplayed(string);
});

When('the user clicks the {string} option from the sidebar', async function (this: CustomWorld, string) {
    await this.sidebarPage.clickSidebarOption(string);
});

When('the user clicks the Add Course button', async function (this: CustomWorld) {
    await this.addCoursePage.clickAddCourse();
});

When('the user clicks the Service type dropdown', async function (this: CustomWorld) {
    await this.addCoursePage.clickServiceDropdown();
});

Then('the user should see the added service as option', async function (this: CustomWorld) {
    await this.addCoursePage.verifyServiceOptionAvailable(this.service!.name);
});

When('the user fill the service name as {string}', async function (this: CustomWorld, string) {
    await this.serviceModelPage.enterServiceName(string);
});

When('the user fill the service description as {string}', async function (this: CustomWorld, string) {
    await this.serviceModelPage.enterServiceDescription(string);
});

Then('the validation message should be displayed', async function (this: CustomWorld) {
    const validity = await this.serviceModelPage.verifyValidity();
    expect(validity.isNameValid && validity.isDescriptionValid).toBeFalsy();
});