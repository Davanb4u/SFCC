const { expect } = require('@playwright/test');

class AccountDetailsPage {

    constructor(page) {
        this.page = page;
        this.kontopagetitle = this.page.locator('xpath=//flexipage-component2[@data-component-id="force_highlightsPanel"]//lightning-formatted-text');
        this.kontonamnValue = this.page.locator(`xpath=//flexipage-component2[@data-component-id="force_detailPanel"]//span[contains(normalize-space(), 'Kontonamn')]/ancestor::div[1]/following-sibling::div[1]//lightning-formatted-text`);
        this.orgnumberValue = this.page.locator(`xpath=//flexipage-component2[@data-component-id="force_detailPanel"]//span[contains(normalize-space(), 'Org. nr')]/ancestor::div[1]/following-sibling::div[1]//lightning-formatted-text`);
        this.tscidValue = this.page.locator(`xpath=//flexipage-component2[@data-component-id="force_detailPanel"]//span[contains(normalize-space(), 'TSCID')]/ancestor::div[1]/following-sibling::div[1]//lightning-formatted-text`);

    }



    async createOrder(utilityFunctionLocal,LocalTestData) {
        const [OrgNum,Tscid,OrgName] = JSON.parse(LocalTestData.get("CustomerDetails").replace(/'/g, '"'));
        await this.validateOrganisation(OrgNum,Tscid,OrgName);
        await utilityFunctionLocal.logSuccess("Konto Page Title, Organisation Number, Customer Name and TSCID validated successfully");
        await this.page.getByRole('button', { name: 'Create Order' }).click();
    }

    async validateOrganisation(OrgNum,Tscid,OrgName){
        await this.page.getByRole('tab', { name: 'Relaterat' }).click();
        await this.page.getByRole('tab', { name: 'Detaljer' }).click();
        //await this.page.getByRole('tab', { name: 'Tillgångar' }).click();
        //await this.page.getByRole('tab', { name: 'Detaljer' }).click();
        await this.page.waitForTimeout(2000); 
        const observedKontopageTitle = await this.kontopagetitle.first().textContent();
        const observedKontovalue = await this.kontonamnValue.textContent();
        const observedOrgnumberValue = await this.orgnumberValue.textContent();
        const observedTscidValue = await this.tscidValue.textContent();
        await expect(observedKontopageTitle).toBe(String(OrgName));
        await expect(observedKontovalue).toBe(String(OrgName));
        await expect(observedOrgnumberValue).toBe(String(OrgNum));
        await expect(observedTscidValue).toBe(String(Tscid));
    }


    
}
module.exports = { AccountDetailsPage };