const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { POManager } = require('../../../main/sfcc/utilities/POManager');
const { UtilityFunctions } = require('../../../main/sfcc/utilities/UtilityFunctions');
const { createContextWithVideo } = require('../../../main/sfcc/utilities/videoHelper');
const fs = require('fs');
const { allure } = require('allure-playwright');
const TestCaseName = 'TC006_AmandaOTA_GJ_GettingStartedOffer';

test('TC006_AmandaOTA_GJ_GettingStartedOffer', async function ({ browser }) {


  //Setting up first browser page
 // const context = await browser.newContext({recordVideo: {dir: 'test-results/videos/', size: { width: 1280, height: 720 }}});
  const context = await browser.newContext();
  //const { context, finalizeVideo } = await createContextWithVideo(browser, TestCaseName);
  const page = await context.newPage();

 
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
    await loginPage.adminUserLogin(utilityFunctionLocal,"Industries CPQ");

    //Step 2 - Login as Dummy Sales Agent
    //await loginPage.loginAsUser(utilityFunctionLocal, LocalTestData.get("SalesRepUser"), "Industries CPQ");
    await loginPage.loginAsUser(utilityFunctionLocal, "Sales User", "Industries CPQ");
    
    //step 3 - search customer and redirect to account page
    await customerSearchPage.CustomerSearchBlock(utilityFunctionLocal,LocalTestData);

    //step 4 - create order 
    await accountDetailsPage.createOrder(utilityFunctionLocal,LocalTestData);

    //step 5 - selecting offer category 
    await offeringCategoryPage.selectOfferingCategory(utilityFunctionLocal,LocalTestData);

    //step 6 - selecting product from cart page 
    await cartPage.addProductToTheCart_V2(utilityFunctionLocal,LocalTestData);
    
    //step 7 - adding installation address
    await postCartPage.configureShippingAddress(utilityFunctionLocal,LocalTestData);
    
    //step 8 - adding delivery date
    await postCartPage.configureDeliverDate(utilityFunctionLocal,LocalTestData);

    //step 9 - adding billing address
    await postCartPage.configureBillingAddress(utilityFunctionLocal,LocalTestData);

    //step 10 - adding ContactRole
    await postCartPage.configureContactRole(utilityFunctionLocal,LocalTestData);

    //step 11 - optout service agreement
    await postCartPage.serviceAgreementOptOut(utilityFunctionLocal,LocalTestData);

    //Step 12 - extracting order details
    const orderNumber = await utilityFunctionLocal.OrderDetailsFetch(OrgNum);
    test.info().annotations.push({ type: 'Order Number ', description: orderNumber});
    
    //Close all browserss
    await context.close();


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

