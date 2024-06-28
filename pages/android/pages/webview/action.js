const mainMenuPage = require('../main-page/MainMenuPage.js');
const sideMenuPage = require('../sidemenu/SideMenuPage.js');
const webviewPage = require('./WebviewPage.js');

module.exports = {
	accessWebviewPage: async function () {
		await mainMenuPage.sideMenu.touchAction('tap');
		await sideMenuPage.webview.touchAction('tap');
	},

	checkContent: async function () {
		await webviewPage.waitForPageToLoad();
		return {
			pageTitle: await webviewPage.getPageTitle(),
			goToSiteBtn: await webviewPage.getGoToSiteBtnText()
		};
	},

	useWebview: async function (url) {
		await webviewPage.enterUrl(url);
		await webviewPage.clickGoToSite();
		return await webviewPage.isWebviewScreenDisplayed();
	}
};
