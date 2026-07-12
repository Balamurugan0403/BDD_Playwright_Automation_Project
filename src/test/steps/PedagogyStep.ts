import { When, Then ,setDefaultTimeout} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";
import { readExcelData } from "../../main/utils/excelReader";
import { PedagogyAddElement,PedagogySearchData } from "../../main/types/PedagogyElement";

setDefaultTimeout(60000);
const addElementData = readExcelData<PedagogyAddElement>(
    "PedagogyData.xlsx",
    "AddElementData"
);

const searchData = readExcelData<PedagogySearchData>(
    "PedagogyData.xlsx",
    "SearchData"
);

const data = addElementData[0];
When("Admin navigates to the Pedagogy section", async function (this: CustomWorld) {
    await this.dynamicFieldManagementPage.openPedagogyManagement();
});

When('the user clicks on the Pedagogy view elements button', async function (this: CustomWorld)  {
    await this.pedagogyPage.clickPedagogyViewElements();
});
   
When('the user clicks on the Add Element button', async function (this: CustomWorld)  {
    await this.pedagogyPage.clickAddElementButton();
});

When('the user enters the element details', async function (this: CustomWorld)  {
    await this.pedagogyPage.enterElementName(data.NewElementName);
});

When('the user clicks on the Create Element button', async function (this: CustomWorld)  {
    await this.pedagogyPage.clickCreateElementButton();
});

Then('the user should be able to see the created element in the list of pedagogy elements', async function (this: CustomWorld) {
    await this.pedagogyPage.clickNextPageButton();
    const elementsList = await this.pedagogyPage.getElementNamesFromPage();
    let isElementFound = false;
    for (const name of elementsList) {
        if (name.trim() === data.NewElementName) {
            isElementFound = true;
            console.log("Element found in the list");
            break;
        }
    }
    if (!isElementFound) {
        throw new Error(`Scenario Failed: Element 'kps' was not found anywhere in the list.`);
    }
});

When('the user Clicks on the edit button', async function (this: CustomWorld) {
  
        await this.pedagogyPage.clickNextPageButton();
    const elementsList = await this.pedagogyPage.getElementNamesFromPage();
 const index = elementsList.length - 1;
  await this.pedagogyPage.clickEditButton(index)

});

When('the user edits the content of element name', async function (this: CustomWorld) {
    // You can hardcode a modified string or make this step dynamic by adding {string}
    
    await this.pedagogyPage.editElementName(data.EditedElementName);
});

When('the user clicks on the Update Element button', async function (this: CustomWorld) {
    // Triggers the save/update action and waits for structural DOM stability
    await this.pedagogyPage.clickUpdateElementButton();
    await this.page.waitForLoadState('networkidle');
});

Then('the user should be able to see the updated element', async function (this: CustomWorld) {
    const expectedUpdatedName = data.EditedElementName;
    await this.pedagogyPage.clickNextPageButton();
    const elementsList = await this.pedagogyPage.getElementNamesFromPage();
    let isElementFound = false;

    for (const name of elementsList) {
        if (name.trim() === expectedUpdatedName) {
            isElementFound = true;
            console.log(`Success: Found the updated element target '${expectedUpdatedName}'`);
            break;
        }
    }
    if (!isElementFound) {
        throw new Error(`Scenario Failed: Updated element text '${expectedUpdatedName}' was missing from the registry view.`);
    }
});

When("the user Clicks on the delete button", async function (this: CustomWorld) {
    await this.pedagogyPage.clickNextPageButton();
    const elementsList = await this.pedagogyPage.getElementNamesFromPage();
    const index = elementsList.length - 1;
    await this.pedagogyPage.clickDeletesvgButton(index);
});

When("the user clicks on the delete confirmation button", async function (this: CustomWorld) {
     await this.pedagogyPage.clickDeleteConfirmationButton()
});

Then(
    "the user should be able to see the deleted element is not present in the list of pedagogy elements",
    async function (this: CustomWorld) {
        const elementsList = await this.pedagogyPage.getElementNamesFromPage();

        await expect(elementsList, 
            `Deleted element '${data.EditedElementName}' should not be present in the pedagogy elements list`
        ).not.toContain(data.EditedElementName);

        console.log(`Success: Element '${data.EditedElementName}' was deleted successfully`);
    }
);
let expectedResult = "";

When("the user enters the {string} in pedagogy activities search bar", async function (this: CustomWorld, dataType: string) {

        const row = searchData.find(
            x => x.datatype.trim().toLowerCase() === dataType.trim().toLowerCase()
        );

        if (!row) {
            throw new Error(`No matching test data found for datatype: ${dataType}`);
        }

        expectedResult = row.result;

        await this.pedagogyPage.searchPedagogyActivity(row.data);
    }
);

Then( "the user should be able to see the corresponding activity", async function (this: CustomWorld) {

        const actualResult = await this.pedagogyPage.getSearchResult();
        expect(actualResult.trim()).toBe(expectedResult.trim());
    }
);