const { LoginPage } = require('../pageObjects/LoginPage');
//const { OpportunityPage } = require('../pageObjects/OpportunityPage');
//const { FACartPage } = require('../pageObjects/FACartPage');
//const { QuotePage } = require('../pageObjects/QuotePage');
//const { ContractPage } = require('../pageObjects/ContractPage');
//const { ContactPage } = require('../pageObjects/ContactPage');
//const { AccountPage } = require('../pageObjects/AccountPage');
//const { LoginPageObjects } = require('../pageObjectLocators/LoginPageObjects');
const { CustomerSearchPage } = require('../pageObjects/CustomerSearchPage');
const { AccountDetailsPage } = require('../pageObjects/AccountDetailsPage');
const { OfferingCategoryPage } = require('../pageObjects/OfferingCategoryPage');
const { CartPage } = require('../pageObjects/CartPage');
const { PostCartPage } = require('../pageObjects/PostCartPage')
 

class POManager {

    constructor(page) {
        this.page = page;
        /*not in use */
        /* this.opportunityPage = new OpportunityPage(this.page);
        this.faCartPage = new FACartPage(this.page);
        this.quotePage = new QuotePage(this.page);
        this.contractPage = new ContractPage(this.page);
        this.contactPage = new ContactPage(this.page);
        this.accountPage = new AccountPage(this.page);*/
        /* in use for sfcc*/
        this.loginPage = new LoginPage(this.page);
        this.customerSearchPage = new CustomerSearchPage(this.page);
        this.accountDetailsPage = new AccountDetailsPage(this.page);
        this.offeringCategoryPage = new OfferingCategoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.postCartPage = new PostCartPage(this.page);
        
    }

    

   /* getOpportunityPage() {
        return this.opportunityPage;
    }

    getFACartPage() {
        return this.faCartPage;
    }

    getQuotePage() {
        return this.quotePage;
    }

    getContractPage() {
        return this.contractPage;
    } 

    getContactPage() {
        return this.contactPage;
    } 
    
    getAccountPage() {
        return this.accountPage;
    } 

    getLoginPageObjects(){
        return this.loginPageObjects;
    }*/


    getLoginPage() {
        return this.loginPage;
    }

    getCustomerSearchPage(){
        return this.customerSearchPage;
    }

    getAccountDetailsPage(){
        return this.accountDetailsPage;
    }

    getOfferingCategoryPage(){
        return this.offeringCategoryPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPostCartPage(){
        return this.postCartPage;
    }

    
}
module.exports = { POManager };