// const expect = require('chai').expect;
// const allureReporter = require('@wdio/allure-reporter').default;
// const login = require('../../../resources/android/pages/login/action.js');
// const assert = require('../../../resources/android/pages/login/assert.js');
// const variable = require('../../../resources/shared/variable.js');
//
// describe('TS-005 | Negative Case', function() {
// 	it('TC-001 | Failed Login - Invalid Credential', async function() {
// 		allureReporter.addTag('Negative Test');
// 		allureReporter.addSeverity('normal');
//
// 		await login.accessLoginPage();
// 		await login.fillUsername(variable.data.invalidUsername);
// 		await login.fillPassword(variable.data.invalidPassword);
// 		await login.clickLogin();
// 		const response = await login.checkLoginStateExpectErrorMessage();
//
// 		expect(response).equal(assert.attribute.invalidUserMessage);
// 	});
//
// 	it('TC-002 | Failed Login - Locked User', async function() {
// 		allureReporter.addTag('Negative Test');
// 		allureReporter.addSeverity('normal');
//
// 		await login.accessLoginPage();
// 		await login.fillUsername(variable.data.blockedUsername);
// 		await login.fillPassword(variable.data.password);
// 		await login.clickLogin();
// 		const response = await login.checkLoginStateExpectErrorMessage();
//
// 		expect(response).equal(assert.attribute.lockedUserMessage);
// 	});
// });


// const expect = require('chai').expect;
// const allureReporter = require('@wdio/allure-reporter').default;
// const login = {
// 	action: require('../../../resources/android/pages/login/loginAction.js'),
// 	assert: require('../../../resources/android/pages/login/assert.js')
// };
// const variable = require('../../../resources/shared/variable.js');
//
// describe('TS-005 | Negative Case', function() {
// 	it('TC-001 | Failed Login - Invalid Credential', async function() {
// 		allureReporter.addTag('Negative Test');
// 		allureReporter.addSeverity('normal');
//
// 		await login.action.accessLoginPage();
// 		await login.action.fillUsername(variable.data.invalidUsername);
// 		await login.action.fillPassword(variable.data.invalidPassword);
// 		await login.action.clickLogin();
// 		const response = await login.action.checkLoginStateExpectErrorMessage();
//
// 		expect(response).equal(login.assert.attribute.invalidUserMessage);
// 	});
//
// 	it('TC-002 | Failed Login - Locked User', async function() {
// 		allureReporter.addTag('Negative Test');
// 		allureReporter.addSeverity('normal');
//
// 		await login.action.accessLoginPage();
// 		await login.action.fillUsername(variable.data.blockedUsername);
// 		await login.action.fillPassword(variable.data.password);
// 		await login.action.clickLogin();
// 		const response = await login.action.checkLoginStateExpectErrorMessage();
//
// 		expect(response).equal(login.assert.attribute.lockedUserMessage);
// 	});
// });

// test suites: TS-005.js
const { expect, setupAllure } = require('../../common/test-common');
const login = {
	action: require('../../../resources/pages/android/pages/login/action.js'),
	assert: require('../../../resources/pages/android/pages/login/assert.js')
};
const variable = require('../../../resources/shared/variable.js');

describe('TS-005 | Negative Case', function() {
	it('TC-001 | Failed Login - Invalid Credential', async function() {
		setupAllure(['Negative Test']);
		await login.action.accessLoginPage();
		await login.action.fillUsername(variable.data.invalidUsername);
		await login.action.fillPassword(variable.data.invalidPassword);
		await login.action.clickLogin();
		const response = await login.action.checkLoginStateExpectErrorMessage();
		expect(response).equal(login.assert.attribute.invalidUserMessage);
	});

	it('TC-002 | Failed Login - Locked User', async function() {
		setupAllure(['Negative Test']);
		await login.action.accessLoginPage();
		await login.action.fillUsername(variable.data.blockedUsername);
		await login.action.fillPassword(variable.data.password);
		await login.action.clickLogin();
		const response = await login.action.checkLoginStateExpectErrorMessage();
		expect(response).equal(login.assert.attribute.lockedUserMessage);
	});
});
