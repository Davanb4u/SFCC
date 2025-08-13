const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { POManager } = require('../../../main/sfcc/utilities/POManager');
const { UtilityFunctions } = require('../../../main/sfcc/utilities/UtilityFunctions');
const { createContextWithVideo } = require('../../../main/sfcc/utilities/videoHelper');
const fs = require('fs');
const { allure } = require('allure-playwright');
const TestCaseName = 'TC005_Standalone_CustomerSearch_with_CustomerName';

test('TC005_Standalone_CustomerSearch_with_CustomerName', async function ({ page }) {
  
  //Setting up first browser page
  //const context = await browser.newContext();
  //const { context, finalizeVideo } = await createContextWithVideo(browser, TestCaseName);
  //const page = await context.newPage();

 
  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const customerSearchPage = poManager.getCustomerSearchPage();
  const accountDetailsPage = poManager.getAccountDetailsPage();
  const offeringCategoryPage =  poManager.getOfferingCategoryPage();
  const cartPage = poManager.getCartPage();
  const postCartPage = poManager.getPostCartPage();

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const TestCaseDescription = LocalTestData.get("testCaseDescription")
  test.info().annotations.push({ type: 'Test Case Description ', description: TestCaseDescription });
  const [OrgNum,Tscid,OrgName] = JSON.parse(LocalTestData.get("CustomerDetails").replace(/'/g, '"'))
  test.info().annotations.push({ type: 'Organisation Number | TSCID | Organisation Name ', description: OrgNum +' | '+ Tscid + ' | ' + OrgName });
  

  try{
    
     //Step 1 - Login into Salesforce as admin
    await loginPage.adminUserLoginForStandAlone(utilityFunctionLocal,"Industries CPQ");

    //step 2 - customer search page with Tscid number
    await customerSearchPage.CustomerSearchPageWithCustomerName(OrgName);

    //step 3 - validating the account page
    await accountDetailsPage.validateOrganisation(OrgNum,Tscid,OrgName);

    //Close all browserss
    //await context.close();
    
   
  }finally{

    /*
      const savedVideoPath = await finalizeVideo(page);
      console.log('✅ Video saved at:', savedVideoPath);
      const videoBuffer = fs.readFileSync(savedVideoPath);
      allure.attachment('Execution Video', videoBuffer, 'video/webm');
      await browser.close();
    */

  }
  


});

/*test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
  }
});*/
