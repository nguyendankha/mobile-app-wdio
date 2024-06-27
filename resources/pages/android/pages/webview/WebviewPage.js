class WebviewPage {
    get appLogo() { return $('//android.view.ViewGroup[@content-desc="longpress reset app"]');}
    get sideMenu() { return $('//android.view.ViewGroup[@content-desc="open menu"]');}
    get pageTitle() { return $('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView');}
    get urlInputField() { return $('//android.widget.EditText[@content-desc="URL input field"]');}
    get goToSiteBtn() { return $('//android.view.ViewGroup[@content-desc="Go To Site button"]');}
    get goToSiteBtnTextView() { return $('//android.view.ViewGroup[@content-desc="Go To Site button"]/android.widget.TextView');}
    get webviewScreen() { return $('//android.view.ViewGroup[@content-desc="webview screen"]');}

    async waitForPageToLoad() {
        await this.appLogo.waitForExist({ timeout: 30000 });
        await this.sideMenu.waitForExist({ timeout: 30000 });
        await this.pageTitle.waitForExist({ timeout: 30000 });
        await this.urlInputField.waitForExist({ timeout: 30000 });
        await this.goToSiteBtn.waitForExist({ timeout: 30000 });
    }

    async getPageTitle() {
        return await this.pageTitle.getText();
    }

    async getGoToSiteBtnText() {
        return await this.goToSiteBtnTextView.getText();
    }

    async enterUrl(url) {
        await this.urlInputField.addValue(url);
    }

    async clickGoToSite() {
        await this.goToSiteBtn.touchAction('tap');
    }

    async isWebviewScreenDisplayed() {
        return await this.webviewScreen.waitForExist({ timeout: 30000 });
    }
}

module.exports = new WebviewPage();
