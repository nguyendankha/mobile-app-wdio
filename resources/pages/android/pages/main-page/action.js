const mainMenuPage = require('./MainMenuPage.js');

module.exports = {
	checkAllContent: async function () {
		await mainMenuPage.waitForPageToLoad();
		return await mainMenuPage.getPageTitle();
	},

	scrollPage: async function () {
		await mainMenuPage.scrollPage();
	},

	checkSortFunction: async function () {
		return await mainMenuPage.checkSortFunction();
	}
};
