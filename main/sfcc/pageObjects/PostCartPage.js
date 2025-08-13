const { expect } = require('@playwright/test');


class PostCartPage {

    constructor(page) {
        this.page = page;
        // create new billing account fields
        this.BAName = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_Name"]//input');
        this.BARecipientName = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_RecipientName"]//input');
        this.BABillingFrequency = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_BillFrequency"]//input');
        this.BABillingFormat = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_BillFormat"]//input');
        this.BAPaymentTerms = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_PaymentTerms"]//input');
        this.BAPaymentMethod = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_PaymentMethod"]//input');
        this.BAInvoiceMethod = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_InvoiceMethod"]//input');
        this.BAInvoiceReference = this.page.locator('xpath=//vlocity_cmt-omniscript-text[@data-omni-key="CC_InvoiceReference"]//input');

       

          //const productDiv = this.page.locator(`div[title*="${ProductsObj[0].ProductName}"]`);
          //const productExpandBtn = productDiv.locator('xpath=preceding::button[1]');
    }


    async configureShippingAddress(utilityFunctionLocal,LocalTestData){
        //await utilityFunctionLocal.customScreenShot(this.page,"cartPage");
        const ShippingAddress = LocalTestData.get("ShippingAddress");
        const installationTrue = JSON.parse(LocalTestData.get("ProductSelection"));
        if(installationTrue[0].RGWFlag === "True"){
            if(ShippingAddress === "Existing"){
                await this.page.getByText('Use same as Installation').click();
                await this.page.getByRole('button', { name: 'Next' }).click();
            }

            if(ShippingAddress === "Other"){
                let address_attribute_1 = LocalTestData.get("ShippingAddress_attribute_1");
                let address_attribute_2 = LocalTestData.get("ShippingAddress_attribute_2");
                await this.page.getByText('Choose other address').click();
                await this.page.getByPlaceholder('Sök adress').click();
                await this.page.getByPlaceholder('Sök adress').type(String(address_attribute_1),{ delay: 200 });
                await this.page.getByText(String(address_attribute_1)).click();
                await this.page.waitForTimeout(3000);
                await this.page.keyboard.press('Tab');
                await this.page.keyboard.press('Enter');
                await this.page.getByRole('option', { name: String(address_attribute_2)}).click();
                await this.page.waitForTimeout(2000);
                await this.page.getByRole('button', { name: 'Next' }).click();
            }
          utilityFunctionLocal.logSuccess("POST CART CONFIGURATION :: Configuring Shipping Address Completed.");
        }else{
          utilityFunctionLocal.logInfo("POST CART CONFIGURATION :: Skipping Configuring Shipping Address.");
        }
       
    }

    async configureDeliverDate(utilityFunctionLocal,LocalTestData){
        const deliveryDate = LocalTestData.get("DeliveryDate")
        if(deliveryDate == "Existing"){
            await this.page.getByRole('heading', { name: 'Delivery Date' }).click();
            //await utilityFunctionLocal.customScreenShot(this.page,"deliveryDate");
            await this.page.getByRole('button', { name: 'Next' }).click();
        }

        if(deliveryDate == "Other"){
            const noofdays = LocalTestData.get("DeliveryDate_attribute");
            const futureDate = await utilityFunctionLocal.GetFutureWeekday(noofdays);
            await this.page.getByRole('heading', { name: 'Delivery Date' }).click();
            await this.page.getByText('Preferred Delivery Date').click();
            await this.page.getByRole('textbox', { name: 'Preferred Delivery Date' }).click();
            await this.page.getByRole('button', { name: 'Select Date' }).nth(1).click();
            await this.page.getByLabel(String(futureDate)).click();
            await this.page.getByRole('button', { name: 'Next' }).click();

            /*const futureDate = await utilityFunctionLocal.getFutureWeekdayDate(noofdays);
            await this.page.getByRole('textbox', { name: 'Preferred Delivery Date' }).fill(String(futureDate));
            await utilityFunctionLocal.customScreenShot(this.page,"deliveryDate");
            await this.page.getByRole('button', { name: 'Next' }).click();*/
        }
        utilityFunctionLocal.logSuccess("POST CART CONFIGURATION :: Configuring Delivery Date Completed.");
    }

    async configureBillingAddress(utilityFunctionLocal,LocalTestData){
        await expect(this.page.getByRole('heading', { name: 'Billing Account' })).toBeVisible({timeout: 30000})
        const billingAddress = LocalTestData.get("BillingAddress");
        const billingAddress_attribute = LocalTestData.get("BillingAddress_attribute");
        if(billingAddress === "Existing"){
            /*await this.page.getByRole('heading', { name: 'Billing Account' }).click();
            await this.page.getByText('Choose from the following').click();
            await this.page.getByText('Select an existing billing').click();
            await this.page.getByRole('button', { name: 'Next' }).nth(1).click();*/

            await this.page.getByPlaceholder('Search').click();
            await this.page.getByPlaceholder('Search').type(String(billingAddress_attribute),{ delay: 20 });
            const billAccDiv =  await this.page.locator(`span[title*="${billingAddress_attribute}"]`);
            const billAccDivSelect = billAccDiv.locator('xpath=preceding::label[1]');
            await billAccDivSelect.click();
            await this.page.getByRole('button', { name: 'Next' }).nth(1).click();
        }

        if(billingAddress === "New"){
            await this.page.getByRole('heading', { name: 'Billing Account' }).click();
            await this.page.getByText('Choose from the following').click();
            await this.page.getByText('Create a new billing account').click();
            
            await this.BAName.fill("Test Automation");
           
            await this.BARecipientName.fill("Narayana Velagala");
           
            await this.page.getByRole('combobox', { name: '*Bill Frequency' }).click();
            await this.page.getByRole('option', { name: 'Monthly' }).click();

            await this.page.getByRole('combobox', { name: '*Bill Format' }).click();
            await this.page.getByRole('option', { name: 'Normal Invoice' }).click();

            await this.page.waitForTimeout(1000);
            
            await this.page.getByRole('combobox', { name: '*Payment Terms' }).click();
            await this.page.getByRole('option', { name: '30 days' }).click();
            //await this.page.getByText('30 days').click();

            await this.page.waitForTimeout(1000);

            await this.page.getByRole('combobox', { name: '*Payment Method' }).click();
            await this.page.getByText('Invoice', { exact: true }).click();

            await this.page.waitForTimeout(1000);


            await this.page.getByRole('combobox', { name: '*Invoice Method' }).click();
            await this.page.locator('[id="\\31 -182"]').getByText('Paper (with fee)').click();

             
            //await utilityFunctionLocal.customScreenShot(this.page,"billingAddress");
            await this.page.getByRole('button', { name: 'Next' }).click();
        }
        utilityFunctionLocal.logSuccess("POST CART CONFIGURATION :: Configuring Billing Address Completed.");
    }

    async configureContactRole(utilityFunctionLocal,LocalTestData){
        //const addressPortExtract = JSON.parse(LocalTestData.get("AddressPort"));
        const responsePromise = Promise.resolve(LocalTestData.get("AddressPort"));
        const addressPortJson = JSON.parse(await responsePromise);
        console.log("from the console")
        console.log(addressPortJson[0].addressPort);
       
        await expect(this.page.getByRole('heading', { name: 'Configure Contact Roles' })).toBeVisible({timeout: 30000})
       /* const checkbox = this.page.locator(`xpath=//div[@role="row"][.//div[text()="dipali.amrutkar@teliacompan"]]//div[@role="cell"][1]//input[@type="checkbox"]`).nth(0);
        await checkbox.click({ force: true });
        await utilityFunctionLocal.customScreenShot(this.page,"contactRole");*/
        await this.page.getByRole('button', { name: 'Next' }).click();
        utilityFunctionLocal.logSuccess("POST CART CONFIGURATION :: Contact Role Completed.");
    }
    
    async serviceAgreementOptOut(utilityFunctionLocal,LocalTestData){
       const serviceAgreementOptOut = LocalTestData.get("ServiceAgreementOptOut");
        if(serviceAgreementOptOut === "No"){
            await this.page.getByRole('heading', { name: 'Tjänsteavtal' }).click();
            await this.page.getByText('Vill du välja bort att skriva').click();
            await this.page.locator('div').filter({ hasText: /^No$/ }).click();
            //await utilityFunctionLocal.customScreenShot(this.page,"Agreementoptout");
            await this.page.getByRole('button', { name: 'Finish Order' , exact: true}).click();
           
        }else if(serviceAgreementOptOut === "Yes"){
            await this.page.getByRole('heading', { name: 'Tjänsteavtal' }).click();
            await this.page.getByText('Vill du välja bort att skriva').click();
            await this.page.locator('label').filter({ hasText: 'Yes' }).click();
            await this.page.getByRole('textbox', { name: '*Skäl för att välja bort' }).click();
            await this.page.getByRole('textbox', { name: '*Skäl för att välja bort' }).fill('Test Automation Request , not required Agreement.');
            await this.page.getByRole('button', { name: 'Finish Order' , exact: true}).click();
            
        }
        utilityFunctionLocal.logSuccess("POST CART CONFIGURATION :: Service Agreement Completed.");
        
    }


c
    
}

module.exports = { PostCartPage };



