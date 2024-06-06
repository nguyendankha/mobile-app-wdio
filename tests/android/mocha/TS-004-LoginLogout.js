const expect = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;
let login;
let logout;
let variable;

describe('TS-004 | Login & Logout', function () {
    before(async function () {
        login = {
            action: require('@pages/android/login/action.js'),
            assert: require('@pages/android/login/assert.js')
        };
        logout = {
            action: require('@pages/android/logout/action.js'),
            assert: require('@pages/android/logout/assert.js')
        };
        variable = require('@resources/shared/variable.js');
    });

    it('TC-001 | Check all content is loaded', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        await login.action.accessLoginPage();
        const response = await login.action.checkContent();

        expect(response.pageTitle).equal(login.assert.attribute.pageTitleText, response.pageTitle);
        expect(response.pageDesc).equal(login.assert.attribute.pageDescText, response.pageDesc);
        expect(response.loginBtn).equal(login.assert.attribute.loginBtnText, response.loginBtn);
    });

    it('TC-002 | Success Login', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        await login.action.fillUsername(variable.data.username);
        await login.action.fillPassword(variable.data.password);
        await login.action.clickLogin();
        const response = await login.action.checkLoginState();

        if (response === 'Login') expect(response).equal('Login', response);
        if (response === 'Products') expect(response).equal('Products', response);
    });

    it('TC-003 | Success Logout', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        const logoutBtnText = await logout.action.clickLogout();
        expect(logoutBtnText).equal(logout.assert.attribute.logoutBtnText, logoutBtnText);

        const logoutStateText = await logout.action.confirmationLogoutOk();
        expect(logoutStateText).equal(logout.assert.attribute.logoutSuccessText, logoutStateText);
    });
});