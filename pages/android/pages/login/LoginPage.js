class LoginPage {
    get pageTitle() { return $('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView');}
    get pageDescription() { return $('//android.view.ViewGroup[@content-desc="login screen"]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]');}
    get usernameInputField() { return $('//android.widget.EditText[@content-desc="Username input field"]');}
    get passwordInputField() { return $('//android.widget.EditText[@content-desc="Password input field"]');}
    get loginButton() { return $('//android.view.ViewGroup[@content-desc="Login button"]');}
    get loginButtonTextView() { return $('//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView');}
    get errorMessageField() { return $('//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView');}

    async waitForPageToLoad() {
        await this.pageTitle.waitForExist({ timeout: 30000 });
        await this.pageDescription.waitForExist({ timeout: 30000 });
        await this.usernameInputField.waitForExist({ timeout: 30000 });
        await this.passwordInputField.waitForExist({ timeout: 30000 });
        await this.loginButton.waitForExist({ timeout: 30000 });
    }

    async getPageTitle() {
        return await this.pageTitle.getText();
    }

    async getPageDescription() {
        return await this.pageDescription.getText();
    }

    async getLoginButtonText() {
        return await this.loginButtonTextView.getText();
    }

    async enterUsername(username) {
        await this.usernameInputField.clearValue();
        await this.usernameInputField.addValue(username);
    }

    async enterPassword(password) {
        await this.passwordInputField.clearValue();
        await this.passwordInputField.addValue(password);
    }

    async clickLogin() {
        await this.loginButton.touchAction('tap');
    }

    async getErrorMessage() {
        return await this.errorMessageField.getText();
    }
}

module.exports = new LoginPage();
