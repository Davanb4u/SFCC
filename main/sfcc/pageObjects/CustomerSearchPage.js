class CustomerSearchPage {

    constructor(page) {
        this.page = page;
       
    }

    async CustomerSearchBlock(utilityFunctionLocal,LocalTestData){
        await this.page.waitForTimeout(3000);
        const [OrgNum,Tscid,OrgName] = JSON.parse(LocalTestData.get("CustomerDetails").replace(/'/g, '"'))
        //logic to select the customer search
        if(LocalTestData.get("searchCustomerBy") == "Org Number"){
            await this.CustomerSearchPageWithOrganisationNumber(OrgNum);
        }else if(LocalTestData.get("searchCustomerBy") == "TSCID"){
            await this.CustomerSearchPageWithTSCID(Tscid);
        }else if(LocalTestData.get("searchCustomerBy") == "Customer Name"){
            await this.CustomerSearchPageWithCustomerName(OrgName);
        }
        utilityFunctionLocal.logSuccess("PRE CART CONFIGURATION :: Searching for Customer Successful")
    }


    async CustomerSearchPageValidation() {
        await this.page.waitForTimeout(5000);
        // basic validation :: heading and sub heading
        await this.page.getByRole('heading', { name: 'Customer Search' }).click();
        await this.page.getByText('Please use Customer Name, TSCID, or Org Number to search').click();
        //basic validation :: clicking on org number and see Org number search box present
        await this.page.locator('fieldset').getByText('Org Number', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#typeaheadLabelId-72').getByText('Org Number').click();
        //basic validation :: clicking on TSCID and see TSCID search box present
        await this.page.locator('fieldset').getByText('TSCID', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#typeaheadLabelId-77').click();
        //basic validation :: clicking on Customer Name and see Customer Name search box present
        await this.page.locator('fieldset').getByText('Customer Name').click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('#typeaheadLabelId-82').getByText('Customer Name').click();
    }

    async CustomerSearchPageWithOrganisationNumber(OrgNum){
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('heading', { name: 'Customer Search' }).click();
        await this.page.getByText('Please use Customer Name, TSCID, or Org Number to search').click();
        await this.page.locator('fieldset').getByText('Org Number', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('combobox', { name: 'Org Number' }).click();
        await this.page.getByRole('combobox', { name: 'Org Number' }).type(String(OrgNum));
        await this.page.getByText(String(OrgNum), { exact: false }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
    }
    
    async CustomerSearchPageWithTSCID(Tscid){
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('heading', { name: 'Customer Search' }).click();
        await this.page.getByText('Please use Customer Name, TSCID, or Org Number to search').click();
        await this.page.locator('fieldset').getByText('TSCID', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('combobox', { name: 'TSCID' }).click();
        await this.page.getByRole('combobox', { name: 'TSCID' }).type(String(Tscid));
        await this.page.getByText(String(Tscid), { exact: false }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async CustomerSearchPageWithCustomerName(OrgName){
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('heading', { name: 'Customer Search' }).click();
        await this.page.getByText('Please use Customer Name, TSCID, or Org Number to search').click();
        await this.page.locator('fieldset').getByText('Customer Name', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('combobox', { name: 'Customer Name' }).click();
        await this.page.getByRole('combobox', { name: 'Customer Name' }).type(String(OrgName));
        await this.page.getByText(String(OrgName), { exact: false }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
    }


    

    
}
module.exports = { CustomerSearchPage };