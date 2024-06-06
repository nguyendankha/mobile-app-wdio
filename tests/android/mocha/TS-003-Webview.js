const expect = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;
let webview;
let assert;
let variable;

describe('TS-003 | Webview', function () {
    before(async function () {
        webview = require('@pages/android/webview/action.js');
        assert = require('@pages/android/webview/assert.js');
        variable = require('@resources/shared/variable.js');
    });
    it('TC-001 | Check all content is loaded', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        await webview.accessWebviewPage();
        const response = await webview.checkContent();

        expect(response.pageTitle).equal(assert.attribute.pageTitleText, response.pageTitle);
        expect(response.goToSiteBtn).equal(assert.attribute.goToSiteBtnText, response.goToSiteBtn);
    });

    it('TC-002 | Access "Google Site"', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        const response = await webview.useWebview(variable.data.webviewUrl);

        expect(response).equal(true, response);
    });
});