const { expect } = require('@playwright/test');


class CartPage {

    constructor(page) {
        this.page = page;
        this.productsInTheCartdivXpath = '//lightning-accordion/div/slot/lightning-accordion-section[1]/[contains(@class, "slds-box slds-m-vertical_x-small")]';
        this.appliedPromotions = '//lightning-accordion/div/slot/lightning-accordion-section[2]';
        this.appliedDiscounts = '//lightning-accordion/div/slot/lightning-accordion-section[3]';
        this.productsInThecatalog = '//c-cpq-cart-catalog-panel/div/div[5]/c-cpq-cart-offer-viewer/div[2]/div/div/table/tbody/tr';
        this.OfferQualified = this.page.locator(`xpath=//flexipage-component2[@data-component-id="MasterOrder2"]//span[contains(normalize-space(), 'Offer Qualified')]/ancestor::div[1]/following-sibling::div[1]//lightning-formatted-text`);
       

    }


    // adding the product to the cart
    // decommissioned  on 22-07-2025 and upated to new verion
    async addProductToTheCart(utilityFunctionLocal,LocalTestData){
        const ProductsObj = JSON.parse(LocalTestData.get("ProductSelection"))
        const productName = ProductsObj[0].ProductName;
        const productBindingPeriod = ProductsObj[0].ProductBindingPeriod;
        const speedEnablement = ProductsObj[0].SpeedEnablement;
        const speedAddOnName = ProductsObj[0].SpeedAddOnName;
        const RGWEnablement = ProductsObj[0].RGWEnablement;
       
        
        
        // step 1 : identifying the product and adding product into the cart by clicking on 'Add Selected to Cart'
       
        const productLocator = this.page.getByText(productName, { exact: true });
        await expect(productLocator).toBeVisible({ timeout: 30000 });
        await productLocator.click();
        await this.page.getByRole('button', { name: 'Add Selected to Cart'}).click();
        await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Product - "+productName+" Added to the cart");
        await this.page.waitForTimeout(7000);

         // step 2: Adding binding period to the configuration
         if(productBindingPeriod && productBindingPeriod.trim() !== ""){
         //if(productBindingPeriod !== null && productBindingPeriod !== "" &&  productBindingPeriod !== " "){
            const configButton  = this.page.locator(`div[title*="${productName}"]`).locator('xpath=following::button[2]');
            await configButton.click();
            await this.page.getByText('Konfigurera', { exact: true }).click();
            const label = this.page.locator("//label[.//span[text()='Binding Period']]");
            const input = label.locator("xpath=following::input[1]");
            await input.click();

            if(productBindingPeriod === "0 Months"){
                await this.page.waitForSelector("//span[text()='0 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='0 Months']").click();
            }else if(productBindingPeriod === "12 Months"){
                await this.page.waitForSelector("//span[text()='12 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='12 Months']").click();
            }else if(productBindingPeriod === "24 Months"){
                await this.page.waitForSelector("//span[text()='24 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='24 Months']").click();
            }

            await this.page.locator('xpath=//c-cpq-cart-right-side-panel//lightning-button-icon//button[1]').click();
            await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Binding Period - "+productBindingPeriod+" is Configured");
            await this.page.waitForTimeout(1000);
        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Binding Period Configuration");
        }

        // step 3: selecting the speed for the service
        if(speedAddOnName && speedAddOnName.trim() !== ""){
        //if(speedAddOnName !== null && speedAddOnName !== "" && speedAddOnName !== " "){
            //Identifying the product in the cart and clicking the toggle button to see internal items
            const productDiv = this.page.locator(`div[title*="${productName}"]`);
            const productExpandBtn = productDiv.locator('xpath=preceding::button[1]');
            await productExpandBtn.click();
            await this.page.waitForTimeout(1000);


            //Identifying the "Internet Service Bundle" Addon in the cart
            const subProductDiv = this.page.locator(`div[title*="${speedAddOnName}"]`);
            const subProductExpandBtn = subProductDiv.locator('xpath=preceding::button[1]');
            await subProductExpandBtn.click();
            await this.page.waitForTimeout(1000);

            // Identifying the instructed speed and enableing it
            const serviceBlock = this.page.locator(`text="${speedEnablement}"`);
            await expect(serviceBlock).toBeVisible();
            const addButton = serviceBlock.locator('xpath=ancestor::div[contains(@class, "slds-box")][1]//button[normalize-space(text())="Add"]');
            await addButton.click();
            await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Internet Speed - "+speedEnablement+" is Configured");
            await this.page.waitForTimeout(5000);

        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Internet Speed Configuration");
        }

        

        // step 4: RGW Disbaling
        if(RGWEnablement && RGWEnablement.trim() !== ""){
            const rgwProductDiv = this.page.locator(`div[title*="${ProductsObj[0].RGWAddOnName}"]`);
            const rgwProductExpandBtn = rgwProductDiv.locator('xpath=preceding::button[1]');
            await rgwProductExpandBtn.click();

            if(RGWEnablement === "No"){
               /* const rgwProduct = this.page.locator(`div[title*="RGW"]`).locator('xpath=following::button[1]');
                await rgwProduct.click();
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: RGW is Deleted");
                await this.page.waitForTimeout(5000);
                const publicStaticIPBeforeAdding =  this.page.locator('//div[contains(text(),"Public Static IP")]').locator('xpath=following::button[1]');
                await publicStaticIPBeforeAdding.click();
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: public Static IP is Added");
                await this.page.waitForTimeout(5000);
                const publicStaticIPAfterAdding =  this.page.locator(`div[title*="Public Static IP"]`).locator('xpath=following::button[1]');
                await publicStaticIPAfterAdding.click();
                await this.page.waitForTimeout(5000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: public Static IP is Deleted");*/

                // Delete RGW product
                const rgwProduct = this.page.locator(`div[title*="RGW"]`).locator('xpath=following::button[1]');
                await rgwProduct.waitFor({ state: 'visible' });
                await rgwProduct.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: RGW is Deleted");
                
                // Add Public Static IP
                /*const publicStaticIPBeforeAdding = this.page.locator('//div[contains(text(),"Public Static IP")]').locator('xpath=following::button[1]');
                await publicStaticIPBeforeAdding.waitFor({ state: 'visible' });
                await publicStaticIPBeforeAdding.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: public Static IP is Added");*/
                
                // Delete Public Static IP
                /*const publicStaticIPAfterAdding = this.page.locator(`div[title*="Public Static IP"]`).locator('xpath=following::button[1]');
                await publicStaticIPAfterAdding.waitFor({ state: 'visible' });
                await publicStaticIPAfterAdding.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: public Static IP is Deleted");*/
            }
        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping RGW and Static Public IP address");
        }
        

        //step 5 : public Static IP enable and disable
        /*const publicStaticIPBeforeAdding =  this.page.locator('//div[contains(text(),"Public Static IP")]').locator('xpath=following::button[1]');
        await publicStaticIPBeforeAdding.click();
        await utilityFunctionLocal.logSuccess("public Static IP is Added");
        await this.page.waitForTimeout(5000);
        const publicStaticIPAfterAdding =  this.page.locator(`div[title*="Public Static IP"]`).locator('xpath=following::button[1]');
        await publicStaticIPAfterAdding.click();
        await this.page.waitForTimeout(2000);
        await utilityFunctionLocal.logSuccess("public Static IP is Deleted");*/

        //final step finish order
        await this.page.getByRole('button', { name: 'Finish Order' }).click();
        await utilityFunctionLocal.OrderDetailsFetch(LocalTestData.get("OrgNumber"));
        utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Order Creation Successful");

    }

    // adding the product to the cart
    //new verions implemented on 22-07-2025
    async addProductToTheCart_V2(utilityFunctionLocal,LocalTestData){
        const ProductsObj = JSON.parse(LocalTestData.get("ProductSelection"))
        const productName = ProductsObj[0].ProductName;
        const AddressAccessType = ProductsObj[0].AddressAccessType;
        const productBindingPeriod = ProductsObj[0].BindingPeriod;
        const speedEnablement = ProductsObj[0].Speed;
        const RGWEnablement = ProductsObj[0].RGWFlag;
        const PublicIPFlagEnablement = ProductsObj[0].PublicIPFlag;
        const speedAddOnName = ProductsObj[0].SpeedAddOnName;
        
       
       
        
        // step 1 : identifying the product and adding product into the cart by clicking on 'Add Selected to Cart'
        const productLocator = this.page.getByText(productName, { exact: true });
        await expect(productLocator).toBeVisible({ timeout: 30000 });
        //before clicking on the product extract addressport
        await this.page.getByRole('tab', { name: 'Detaljer' }).click();
        const AddressPort = this.OfferQualified.textContent()
        LocalTestData.set("AddressPort", AddressPort);
        await this.page.getByRole('tab', { name: 'Cart' }).click();
        await this.page.waitForTimeout(1000)
        //clicking on the product
        await productLocator.click();
        await this.page.getByRole('button', { name: 'Add Selected to Cart'}).click();
        await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Product - "+productName+" Added to the cart");
        await this.page.waitForTimeout(7000);

         // step 2: Adding binding period to the configuration
         if(productBindingPeriod && productBindingPeriod.trim() !== ""){
         //if(productBindingPeriod !== null && productBindingPeriod !== "" &&  productBindingPeriod !== " "){
            const configButton  = this.page.locator(`div[title*="${productName}"]`).locator('xpath=following::button[2]');
            await configButton.click();
            await this.page.getByText('Konfigurera', { exact: true }).click();

            //validate AccessType
            if(AddressAccessType && AddressAccessType.trim() !== ""){
                const AccessTypeinputLocator = this.page.locator(`xpath=//label[contains(normalize-space(), 'Access Type ID')]/ancestor::lightning-input//input`);
                await AccessTypeinputLocator.waitFor({ state: 'visible' });
                const AccessTypeinputValue = await AccessTypeinputLocator.evaluate(el => el.value);
                await expect(AccessTypeinputValue).toBe(String(AddressAccessType));
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Address Access Type - "+AddressAccessType+" Validation is Successful");
            }else{
                await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Address Access Type Validation");
            }
            
            

            //identifying the bindingperiod input and selecting the binding period from dropdown
            const BindingPeriodlabel = this.page.locator("//label[.//span[text()='Binding Period']]");
            const BindingPeriodinput = BindingPeriodlabel.locator("xpath=following::input[1]");
            await BindingPeriodinput.click();

            if(productBindingPeriod === "0M"){
                await this.page.waitForSelector("//span[text()='0 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='0 Months']").click();
            }else if(productBindingPeriod === "12M"){
                await this.page.waitForSelector("//span[text()='12 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='12 Months']").click();
            }else if(productBindingPeriod === "24M"){
                await this.page.waitForSelector("//span[text()='24 Months']", { state: 'visible' });
                await this.page.locator("//span[text()='24 Months']").click();
            }

            await this.page.locator('xpath=//c-cpq-cart-right-side-panel//lightning-button-icon//button[1]').click();
            await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Binding Period - "+productBindingPeriod+" is Configured");
            await this.page.waitForTimeout(1000);
        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Binding Period Configuration");
        }


        //Step 3 Identify the added product with the name and toggling it to see internal details/items
        const productDiv = this.page.locator(`div[title*="${productName}"]`);
        const productExpandBtn = productDiv.locator('xpath=preceding::button[1]');
        await productExpandBtn.click();
        await this.page.waitForTimeout(1000);





        // step 4: selecting the speed for the service
        if(speedEnablement && speedEnablement.trim() !== ""){
            //Identifying the "Internet Service Bundle" Addon in the cart
            const InternetServiceBundleDiv = this.page.locator(`div[title*='Internet Service Bundle']`);
            const InternetServiceBundleDivExpandBtn = InternetServiceBundleDiv.locator('xpath=preceding::button[1]');
            await InternetServiceBundleDivExpandBtn.click();
            await this.page.waitForTimeout(1000);

            // Identifying the instructed speed and enableing it
            const serviceBlock = this.page.locator(`text="${speedEnablement}"`);
            await expect(serviceBlock).toBeVisible();
            const addButton = serviceBlock.locator('xpath=ancestor::div[contains(@class, "slds-box")][1]//button[normalize-space(text())="Add"]');
            await addButton.click();
            await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Internet Speed - "+speedEnablement+" is Configured");
            await this.page.waitForTimeout(5000);

        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Internet Speed Configuration");
        }

        
        //Add-on Service Bundle (RGW and Public Static IP) div toggling to see internal details/items
        const rgwProductDiv = this.page.locator(`div[title*='Add-On Service Bundle']`);
        if(await rgwProductDiv.isVisible()){ 
            const rgwProductExpandBtn = rgwProductDiv.locator('xpath=preceding::button[1]');
            await rgwProductExpandBtn.click();
        }
        

        // step 5: RGW Disbaling
        if(RGWEnablement && RGWEnablement.trim() !== ""){
            
            if(RGWEnablement === "False"){
                // Delete RGW product
                await this.page.waitForTimeout(5000);
                const rgwProduct = this.page.locator(`div[title*="RGW"]`).locator('xpath=following::button[1]');
                await rgwProduct.waitFor({ state: 'visible' });
                await rgwProduct.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: RGW is Deleted");
                
                
            }
        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping RGW ");
        }


        if(PublicIPFlagEnablement && PublicIPFlagEnablement.trim() !== ""){
            if(PublicIPFlagEnablement === "True"){
                // Add Public Static IP
                await this.page.waitForTimeout(5000);
                const publicStaticIPBeforeAdding = this.page.locator('//div[contains(text(),"Public Static IP")]').locator('xpath=following::button[1]');
                await publicStaticIPBeforeAdding.waitFor({ state: 'visible' });
                await publicStaticIPBeforeAdding.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Static public IP is Added");
                
                // Delete Public Static IP
                /*const publicStaticIPAfterAdding = this.page.locator(`div[title*="Public Static IP"]`).locator('xpath=following::button[1]');
                await publicStaticIPAfterAdding.waitFor({ state: 'visible' });
                await publicStaticIPAfterAdding.click();
                await this.page.waitForTimeout(7000);
                await utilityFunctionLocal.logSuccess("CART CONFIGURATION :: public Static IP is Deleted");*/
            }

        }else{
            await utilityFunctionLocal.logInfo("CART CONFIGURATION :: Skipping Static Public IP address");
        }

        //final step finish order
        await this.page.getByRole('button', { name: 'Finish Order' }).click();
        const [OrgNum,Tscid,OrgName] = JSON.parse(LocalTestData.get("CustomerDetails").replace(/'/g, '"'));
        await utilityFunctionLocal.OrderDetailsFetch(OrgNum);
        utilityFunctionLocal.logSuccess("CART CONFIGURATION :: Order Creation Successful");

    }


    async checkQualifiedProduct(utilityFunctionLocal,LocalTestData){
        const ProductsObj = JSON.parse(LocalTestData.get("ProductSelection"))
        const productName = ProductsObj[0].ProductName;
        const productLocator = this.page.getByText(productName, { exact: true });
        await expect(productLocator).toBeVisible({ timeout: 30000 });
        await utilityFunctionLocal.logSuccess("Product Qualification Successfull")
    }













}

module.exports = { CartPage };



