const expect = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;
let sideMenu;
let assert;

describe('TS-002 | Side Menu', function () {
    before(async function () {
        sideMenu = require('@pages/android/sidemenu/action.js');
        assert = require('@pages/android/sidemenu/assert.js');
    });

    it('TC-001 | Check all content is loaded', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        const response = await sideMenu.checkContent();

        expect(response.webviewText).equal(assert.attribute.webviewText, response.webviewText);
        expect(response.catalogText).equal(assert.attribute.catalogText, response.catalogText);
        expect(response.aboutText).equal(assert.attribute.aboutText, response.aboutText);
    });

    it('TC-002 | Access "About Page"', async function () {
        allureReporter.addTag('Sanity Test');
        allureReporter.addSeverity('normal');

        const response = await sideMenu.accessAboutPage();

        expect(response).equal(true, response);
    });
});