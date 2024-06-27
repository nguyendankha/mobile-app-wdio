class SideMenuPage {
    get catalog() { return $('//android.view.ViewGroup[@content-desc="menu item catalog"]');}
    get catalogTextView() { return $('//android.view.ViewGroup[@content-desc="menu item catalog"]/android.widget.TextView');}
    get webview() { return $('//android.view.ViewGroup[@content-desc="menu item webview"]');}
    get webviewTextView() { return $('//android.view.ViewGroup[@content-desc="menu item webview"]/android.widget.TextView');}
    get about() { return $('//android.view.ViewGroup[@content-desc="menu item about"]');}
    get aboutTextView() { return $('//android.view.ViewGroup[@content-desc="menu item about"]/android.widget.TextView');}
    get login() { return $('//android.view.ViewGroup[@content-desc="menu item log in"]');}
    get loginTextView() { return $('//android.view.ViewGroup[@content-desc="menu item log in"]/android.widget.TextView');}
    get logout() { return $('//android.view.ViewGroup[@content-desc="menu item log out"]');}
    get logoutTextView() { return $('//android.view.ViewGroup[@content-desc="menu item log out"]/android.widget.TextView');}

    async openMenu() {
        await $('//android.view.ViewGroup[@content-desc="open menu"]').touchAction('tap');
    }

    async waitForMenuItems() {
        await this.webview.waitForExist({ timeout: 30000 });
        await this.catalog.waitForExist({ timeout: 30000 });
        await this.about.waitForExist({ timeout: 30000 });
    }

    async getMenuItemTexts() {
        const webviewText = await this.webviewTextView.getText();
        const catalogText = await this.catalogTextView.getText();
        const aboutText = await this.aboutTextView.getText();
        return { webviewText, catalogText, aboutText };
    }

    async accessAboutPage() {
        await this.about.waitForExist({ timeout: 30000 });
        await this.about.touchAction('tap');
        const response = await this.about.waitForExist({ timeout: 30000, reverse: true});
        return response;
    }
}

module.exports = new SideMenuPage();
