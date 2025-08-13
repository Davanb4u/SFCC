const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');
const { POManager } = require('../../../main/sfcc/utilities/POManager');
const { UtilityFunctions } = require('../../../main/sfcc/utilities/UtilityFunctions');
const { createContextWithVideo } = require('../../../main/sfcc/utilities/videoHelper');
const fs = require('fs');
const { allure } = require('allure-playwright');
const TestCaseName = 'TC100_delete_orderthrough_service_request';


test.skip('TC100_delete_orderthrough_service_request.', async function ({ browser }) {


  //Setting up first browser page
  const context = await browser.newContext();
  //const { context, finalizeVideo } = await createContextWithVideo(browser, TestCaseName);
  const page = await context.newPage();

 
  //Test Object setup - Create Objects of pages to work with


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();

  try{
    await utilityFunctionLocal.OrderDetailsFetchAndDelete("5599952974")
  }finally{

  }
  


});

