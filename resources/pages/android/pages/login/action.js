const mainMenuPage = require('../main-page/MainMenuPage.js');
const sideMenuPage = require('../sidemenu/SideMenuPage.js');
const loginPage = require('./LoginPage.js');

module.exports = {
	accessLoginPage: async function () {
		await mainMenuPage.sideMenu.touchAction('tap');
		await sideMenuPage.login.touchAction('tap');
	},

	checkContent: async function () {
		await loginPage.waitForPageToLoad();
		return {
			pageTitle: await loginPage.getPageTitle(),
			pageDesc: await loginPage.getPageDescription(),
			loginBtn: await loginPage.getLoginButtonText()
		};
	},

	fillUsername: async function (username) {
		await loginPage.enterUsername(username);
	},

	fillPassword: async function (password) {
		await loginPage.enterPassword(password);
	},

	clickLogin: async function () {
		await loginPage.clickLogin();
	},

	checkLoginState: async function () {
		await mainMenuPage.pageTitle.waitForExist({ timeout: 30000 });
		return await mainMenuPage.pageTitle.getText();
	},

	checkLoginStateExpectErrorMessage: async function () {
		return await loginPage.getErrorMessage();
	}
};
