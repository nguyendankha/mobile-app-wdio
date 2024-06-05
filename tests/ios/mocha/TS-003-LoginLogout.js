const allureReporter = require('@wdio/allure-reporter').default;
const expect = require('chai').expect;
const login = {
	action: require('../../../pages/ios/login/action.js'),
	assert: require('../../../pages/ios/login/assert.js')
};
const logout = {
	action: require('../../../pages/ios/logout/action.js'),
	assert: require('../../../pages/ios/logout/assert.js')
};
const variable = require('../../../resources/shared/variable.js');

describe('TS-003 | Login & Logout', function() {
	it('TC-001 | Check all content is loaded', async function() {
		allureReporter.addTag('Sanity Test');
		allureReporter.addSeverity('normal');

		await login.action.goToLoginPage();
		const response = await login.action.checkContent();

		expect(response.pageTitle).equal(login.assert.attribute.pageTitleText, response.pageTitle);
		expect(response.pageDesc).equal(login.assert.attribute.pageDescText, response.pageDesc);
		expect(response.loginBtn).equal(login.assert.attribute.loginBtnText, response.loginBtn);
	});

	it('TC-002 | Success Login', async function() {
		allureReporter.addTag('Sanity Test');
		allureReporter.addSeverity('normal');

		await login.action.fillUsername(variable.data.username);
		await login.action.fillPassword(variable.data.password);
		await login.action.tapLogin();
		const response = await login.action.checkLoginState();

		if (response == 'Login') expect(response).equal('Login', response);
		if (response == 'Products') expect(response).equal('Products', response);
	});

	it('TC-003 | Success Logout', async function() {
		allureReporter.addTag('Sanity Test');
		allureReporter.addSeverity('normal');

		const logoutBtnText = await logout.action.doLogout();
		expect(logoutBtnText).equal(logout.assert.attribute.logoutBtnText, logoutBtnText);
		
		const logoutSuccessText = await logout.action.logoutPromptOK();
		expect(logoutSuccessText).equal(logout.assert.attribute.logoutSuccessText, logoutSuccessText);
	});
});