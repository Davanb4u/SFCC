const { test } = require('@playwright/test');
const { POManager } = require('../../../main/sfcc/utilities/POManager');
const { UtilityFunctions } = require('../../../main/sfcc/utilities/UtilityFunctions');

const TestCaseName = 'TC043_Search_Organization_with_different_filters';

test.skip('TC043_Search_Organization_with_different_filters', async function ({ browser }) {
 
  

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();

 
  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const customerSearchPage = poManager.getCustomerSearchPage();
  

  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  

  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal,"Industries CPQ");

 //Step 2 - Login as Dummy Sales Agent
  await loginPage.loginAsUser(utilityFunctionLocal, "Sales User", "Industries CPQ");

  //step 3 - validating customer search page
  //await customerSearchPage.CustomerSearchPageValidation();

  //step 4 - customer search page with organisation number
  await customerSearchPage.CustomerSearchPageWithOrganisationNumber("5599917951");
  await page.waitForTimeout(5000);
  await page.goBack();
  await page.reload();
  await UtilityFunctions.logInfo("Org Number Search Successfull!")
  
  //step 5 - customer search with TSCID
  await customerSearchPage.CustomerSearchPageWithTSCID("7081531435");
  await page.waitForTimeout(5000);
  await page.goBack();
  await page.reload();
  await UtilityFunctions.logInfo("TSCID Search Successfull!")
  

  //step 6 - customer search with Customer Name 
  await customerSearchPage.CustomerSearchPageWithCustomerName("Testorica 1795 AB");
  await page.waitForTimeout(5000);
  await page.goBack();
  await page.reload();
  await UtilityFunctions.logInfo("Customer Name Search Successfull!")
  
  


  //Close all browserss
  await context.close();


});