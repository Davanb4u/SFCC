const { expect } = require('@playwright/test');


class OfferingCategoryPage {

    constructor(page) {
        this.page = page;
        this.offcerCategoryLabel =  this.page.locator("xpath=//h1[normalize-space()='Select Offering Category']"); // H1 label tag
        this.internetAccessSelection = this.page.getByText('Internet Access'); // Internet access selection 
        this.supportServiceSelection = this.page.getByText('Support Services'); // Internet access selection 

        // installation address block elements
        this.searchByAddressRadioButton = this.page.locator('label').filter({ hasText: 'Search by address' }); // radio button for selection search by address
        this.searchByPointIDRadioButton = this.page.locator('label').filter({ hasText: 'Search by pointId' }); // radio button for selection search by pointid
        //this.internetAccessInputSearchStreetAddress = this.page.getByPlaceholder('Sök adress'); // input filled with search address
        this.legalAddressCheckBox = "";
        this.searchStreetAddressInput = this.page.locator('xpath=//div[@data-style-id="state0element3block_element2"]//input[@placeholder="Sök adress"]'); // input filled with search address
        this.searchBlockAddressInput = this.page.locator('xpath=//div[@data-style-id="state0element3block_element3"]//input'); // input filled with search address
        this.searchBlockAddressError = "";
        this.addressSelectionErrorMessage = "";
        this.searchBlockPointidInput = this.page.locator('xpath=//div[@data-style-id="state0element2"]//input[@placeholder="Enter PointId"]');
        this.searchBlockPointidSearchButton = this.page.locator('xpath=//div[@data-style-id="state0element2block_element1"]//button[@aria-label="Search"]');
        this.searchBlockPointIDAddressDIsplay = this.page.locator('xpath=//div[@data-style-id="state0element2block_element3"]//span//div')
        
    }



    async selectOfferingCategory(utilityFunctionLocal,LocalTestData) {
       await this.page.getByRole('heading', { name: 'Select Offering Category' }).click();
       const offerCategoryType = LocalTestData.get("offerCategoryType");
       if(offerCategoryType === "Internet Access"){
            await this.selectInternetAccess(utilityFunctionLocal,LocalTestData);
       }else if(offerCategoryType === "Support Services"){
            await this.selectSupportService(utilityFunctionLocal,LocalTestData);
       }else if(offerCategoryType === "Security Services"){
            await this.selectSecurityServices(utilityFunctionLocal,LocalTestData);
       }else if(offerCategoryType === "Business Network WAN"){
            await this.businessNetworkWAN(utilityFunctionLocal,LocalTestData);
       }
    }

    async selectInternetAccess(utilityFunctionLocal,LocalTestData){
        //service qualification provided by address
        const [pointID,streetAddress,doorNumber] = JSON.parse(LocalTestData.get("serviceQualificationDetails").replace(/'/g, '"'))
        //const address_attribute_1 = LocalTestData.get("serviceQualificationBy_attribute1");
        //const address_attribute_2 = LocalTestData.get("serviceQualificationBy_attribute2");
        await this.page.waitForTimeout(2000)
        //await expect(this.offcerCategoryLabel.nth(1)).toBeVisible();
        //await this.internetAccessSelection.nth(1).click();
        await expect(this.offcerCategoryLabel).toBeVisible();
        await this.internetAccessSelection.click();
        utilityFunctionLocal.logSuccess("PRE CART CONFIGURATION :: Selected Offer category as 'Internet Access'")
        await this.page.waitForTimeout(500); 

        if(LocalTestData.get("serviceQualificationBy") === "ByAddress"){
            await this.searchByAddressRadioButton.click();
            await this.searchStreetAddressInput.click();
            await this.searchStreetAddressInput.type("Aspnäsvägen 22, 17737",{ delay: 50 });
            await this.page.getByText("Aspnäsvägen 22, 17737").click();
            await this.page.waitForTimeout(2000);
            await this.searchStreetAddressInput.press('Control+A')
            await this.searchStreetAddressInput.type(String(streetAddress),{ delay: 50 });
            await this.page.getByText(String(streetAddress)).click();
            await this.searchStreetAddressInput.click();
            await this.page.waitForTimeout(4000);
            await this.searchBlockAddressInput.click();
            //await this.page.getByText(String(address_attribute_2)).click();
            await this.page.getByRole('option', { name: String(doorNumber)}).click();
            await this.page.waitForTimeout(1000);
            await this.page.getByRole('button', { name: 'Next' }).click(); 
            utilityFunctionLocal.logSuccess("PRE CART CONFIGURATION :: Address Selection Successful with search Address");
        }

        //service qualification provided by pointid
        if(LocalTestData.get("serviceQualificationBy") === "ByPointID"){
            await this.searchByPointIDRadioButton.click();
            await this.searchBlockPointidInput.click();
            await this.searchBlockPointidInput.type(String(pointID),{ delay: 50 });
            await this.searchBlockPointidSearchButton.click();
            await this.page.waitForTimeout(2000);
            const pointIDaddress = (await this.searchBlockPointIDAddressDIsplay.innerText()).toLowerCase().replace(/\s+/g, ' ').trim();
            const pointIDaddressCompareWith = streetAddress.split(',');
            await expect(pointIDaddress).toMatch(new RegExp(pointIDaddressCompareWith[0], 'i'));
            await expect(pointIDaddress).toMatch(new RegExp(doorNumber, 'i'));
            await this.page.getByRole('button', { name: 'Next' }).click();
            utilityFunctionLocal.logSuccess("PRE CART CONFIGURATION :: Address Selection Successful with PointID");
        }

        //service qualification provided by legalAddressCheck
        if(LocalTestData.get("serviceQualificationBy") === "ByLegalAddressCheck"){

        }


    }
    
    async selectSupportService(utilityFunctionLocal,LocalTestData){
        console.info("not @ implemented!");
    }

    async selectSecurityServices(utilityFunctionLocal,LocalTestData){
        console.info("not @ implemented!");
    }

    async businessNetworkWAN(utilityFunctionLocal,LocalTestData){
        console.info("not @ implemented!");
    }
}

module.exports = { OfferingCategoryPage };