class MainMenuPage {
    get appLogo() { return $('//android.view.ViewGroup[@content-desc="longpress reset app"]');}
    get sideMenu() { return $('//android.view.ViewGroup[@content-desc="open menu"]');}
    get pageTitle() { return $('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView');}
    get scrollView() { return $('//android.view.ViewGroup[@content-desc="products screen"]/android.widget.ScrollView');}
    get sortButton() { return $('//android.view.ViewGroup[@content-desc="sort button"]');}
    get sortDescBtn() { return $('//android.view.ViewGroup[@content-desc="nameDesc"]');}
    get sortDescBtnTxt() { return $('//android.view.ViewGroup[@content-desc="nameDesc"]/android.widget.TextView[2]');}

    async waitForPageToLoad() {
        await this.appLogo.waitForExist({ timeout: 30000 });
        await this.sideMenu.waitForExist({ timeout: 30000 });
        await this.pageTitle.waitForExist({ timeout: 30000 });
    }

    async getPageTitle() {
        return await this.pageTitle.getText();
    }

    async scrollPage() {
        await driver.touchAction([
            { action: 'press', x: 520, y: 1200 },
            { action: 'moveTo', x: 535, y: 226 },
            'release'
        ]);

        await driver.touchAction([
            { action: 'press', x: 535, y: 226 },
            { action: 'moveTo', x: 520, y: 1200 },
            'release'
        ]);
    }

    async checkSortFunction() {
        await this.sortButton.touchAction('tap');
        await this.sortDescBtn.waitForExist({ timeout: 30000 });
        const text = await this.sortDescBtnTxt.getText();
        await this.sortDescBtn.touchAction('tap');
        return text;
    }
}

module.exports = new MainMenuPage();
