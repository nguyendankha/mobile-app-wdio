const mainMenuPage = require('../main-page/MainMenuPage.js');
const sideMenuPage = require('./SideMenuPage.js');

module.exports = {
	checkContent: async function () {
		await mainMenuPage.sideMenu.touchAction('tap');
		await sideMenuPage.waitForMenuItems();
		return await sideMenuPage.getMenuItemTexts();
	},

	accessAboutPage: async function () {
		return await sideMenuPage.accessAboutPage();
	}
};
