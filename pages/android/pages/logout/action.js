const mainMenuPage = require('../main-page/MainMenuPage.js');
const sideMenuPage = require('../sidemenu/SideMenuPage.js');
const logoutPage = require('./LogoutPage.js');

module.exports = {
	clickLogout: async function () {
		await mainMenuPage.sideMenu.touchAction('tap');
		await sideMenuPage.logout.touchAction('tap');
		await logoutPage.waitForLogoutPopup();
		const logoutBtnText = await logoutPage.getLogoutButtonText();
		await logoutPage.confirmLogout();
		return logoutBtnText;
	},

	confirmationLogoutOk: async function () {
		const logoutSuccessText = await logoutPage.getLogoutSuccessText();
		await logoutPage.confirmLogoutSuccessPrompt();
		return logoutSuccessText;
	}
};
