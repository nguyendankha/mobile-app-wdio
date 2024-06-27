// utils/common.js
const expect = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;

function setupAllure(tags = [], severity = 'normal') {
    tags.forEach(tag => allureReporter.addTag(tag));
    allureReporter.addSeverity(severity);
}

module.exports = {
    expect,
    allureReporter,
    setupAllure,
};
