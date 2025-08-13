# SFCC_TestAutomation

This project Placeholder for SFCC Test Automation which is cloned from this repo mentioned below

```sh
https://github.com/telia-company/SFCCTestAutomation
```

##Points to be noted 

1. this setup does not includes github workflows which will be taken care in the later part of the implementation 
2. Evironment setup is currently configured to AmandaB2BSales which need to be setup to SFCC 



## Pre-requisites

1. Visual Studio installed
2. Node.js installed
3. GitHub user access and access to `teliacompany` organization
4. User should have admin access to the environment

## Configuration Steps for Playwright and Test Automation Repository

1. In Visual Studio, open a new window, navigate to the Source Control section, and clone the repository:
    ```sh
    https://github.com/telia-company/SFCCTestAutomation.git
    ```
2. Once the repository is cloned, open the terminal, select PowerShell, and run the following command to install all the required dependencies:
    ```sh
    npm install
    ```
3. Once the dependencies are installed, run the following command to install the required browsers for Playwright:
    ```sh
    npx playwright install --with-deps
    ```
4. To set up credentials in your local environment for Playwright tests to use:
    1. Create a `resources-credentials` folder.
    2. Add `environmentParameters.json` and `credentialsST1Environment.json` files.
    3. In `environmentParameters.json`, add the following content (e.g. ST1Environment):
        ```json
        {
            "environment": "ST1Environment"
        }
        ```
    4. In `credentialsST1Environment.json`, provide the following parameters:
        ```json
        {
            "username": "XXXXXXXX",
            "password": "XXXXXXXX",
            "clientId": "XXXXXXXX",
            "clientSecret": "XXXXXXXX",
            "securityToken": "XXXXXXXX",
            "environmentURL": "https://telia--sfccdev1.sandbox.my.salesforce.com/",
            "JIRABaseURL": "https://jira.atlassian.teliacompany.net",
            "JIRAusername": "XXXXXXXX",
            "JIRApassword": "XXXXXXXX"
        }
        ```
5. Also for local executions, update `playwright.config.js` file with below changes,
    1. Disable `retries : 1,`
    ```sh
    //retries : 1,
    ```
    2. Replace `reporter: [['list', { printSteps: false }]],` with below,
    ```sh
    reporter: 'html',
    ```
6. Run the test with the following command, replacing `TESTNAME` with the name of the test you want to run:
    ```sh
    npx playwright test TESTNAME.spec.js
    ```
