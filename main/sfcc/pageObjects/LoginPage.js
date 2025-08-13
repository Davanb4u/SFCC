class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.locator("#username");
        this.passwordTextbox = page.locator("#password");
        this.loginButton = page.locator("#Login");
    }



    async adminUserLogin(utilityFunction,SalesApplication) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL"));
        await this.usernameTextbox.type(secretsData.get("username"));
        await this.passwordTextbox.type(secretsData.get("password"));
        await this.loginButton.click();
        await this.page.waitForTimeout(1000);  
        utilityFunction.logSuccess("ADMIN LOGIN :: successful.");
    }

     async adminUserLoginForStandAlone(utilityFunction,SalesApplication) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL"));
        await this.usernameTextbox.type(secretsData.get("username"));
        await this.passwordTextbox.type(secretsData.get("password"));
        await this.loginButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Appstartare' }).waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'Appstartare' }).click();
        const searchInput = this.page.getByPlaceholder('Sök appar och objekt...');
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.click();
        await searchInput.fill(SalesApplication);
        const option = this.page.getByRole('option', { name: SalesApplication }).first();
        await option.waitFor({ state: 'visible' });
        await option.click();
        await this.page.waitForTimeout(10000);
        const dropdown = this.page.getByRole('button', { name: 'Visa navigeringsmeny' });
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.getByRole('menuitem', { name: 'Konton' }).click();
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.getByRole('menuitem', { name: 'Startsida' }).click();
        utilityFunction.logSuccess("ADMIN LOGIN :: successful.");
     }

    
    



    async loginAsUser(utilityFunction, user, SalesApplication) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const orgID = await utilityFunction.RunSOQLQuery("select id from Organization");
        console.log("orgID :: "+orgID)
        const userID = await utilityFunction.RunSOQLQuery("select id from user where name = \'"+user+"\'");
        console.log("userID :: "+userID)
        const userLoginURL = secretsData.get("environmentURL") + "/servlet/servlet.su?oid=" + orgID + "&suorgadminid=" + userID + "&retURL=%2F" + userID + "%3Fnoredirect%3D1%26isUserEntityOverride%3D1&targetURL=%2Fhome%2Fhome.jsp";
        console.log("userLoginURL :: "+userLoginURL)
        var updatedData = {
            LanguageLocaleKey: "sv"
        };
        await utilityFunction.RunUpdateDML("User", userID, updatedData);
        await this.page.goto(userLoginURL);
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Appstartare' }).waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'Appstartare' }).click();
        const searchInput = this.page.getByPlaceholder('Sök appar och objekt...');
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.click();
        await searchInput.fill(SalesApplication);
        const option = this.page.getByRole('option', { name: SalesApplication }).first();
        await option.waitFor({ state: 'visible' });
        await option.click();
        await this.page.waitForTimeout(10000);
        const dropdown = this.page.getByRole('button', { name: 'Visa navigeringsmeny' });
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.getByRole('menuitem', { name: 'Konton' }).click();
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.getByRole('menuitem', { name: 'Startsida' }).click();
        utilityFunction.logSuccess("USER LOGIN :: user logged in as "+user+" is successful.");
    }

     async loginAsUserForOrderProcess(utilityFunction, user, SalesApplication) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const orgID = await utilityFunction.RunSOQLQuery("select id from Organization");
        console.log("orgID :: "+orgID)
        await this.page.getByRole('button', { name: 'Appstartare' }).click();
        await this.page.getByPlaceholder('Sök appar och objekt...').click();
        await this.page.getByPlaceholder('Sök appar och objekt...').fill(SalesApplication);
        await this.page.getByRole('option', { name: SalesApplication }).first().click();
        await this.page.getByRole('button', { name: 'Visa navigeringsmeny' }).click();
        await this.page.getByRole('menuitem', { name: 'Order' }).click();
        await this.page.getByRole('button', { name: 'Visa navigeringsmeny' }).click();
        await this.page.getByRole('menuitem', { name: 'Konton' }).click();
        utilityFunction.logSuccess("USER LOGIN :: user logged in as "+user+" is successful.");
        
        
    }


    
}
module.exports = { LoginPage };