class HomePage{

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.locator("#username");
        this.passwordTextbox = page.locator("#password");
        this.loginButton = page.locator("#Login");
    }
}