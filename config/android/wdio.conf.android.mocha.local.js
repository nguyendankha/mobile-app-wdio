/* eslint-disable no-console */
let { join } = require("path");
const allure = require("allure-commandline");
const list = require("./test.suite.android.js");

const localCapabilities = {
  platformName: "Android", // or "iOS"
  "appium:deviceName": "Samsung Galaxy A52S",
  "appium:udid": "R5CT138MKGV", // or "iPhone Simulator"
  "appium:automationName": "UiAutomator2", // or "XCUITest"
  "appium:app": join(process.cwd(), "./app/demo.apk"),
  "appium:fullReset": true,
};

exports.config = {
  runner: "local",
  port: 4723,
  specs: [
    // ToDo: define location for spec files here
    "../../tests/android/mocha/TS-*.js",
  ],
  suites: list.testSuite,
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 1,
  capabilities: [
    // capabilities for local Appium web tests on an Android Emulator
    localCapabilities,
  ],
  logLevel: "info",
  // outputDir: './logs',

  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["appium"],
  framework: "mocha",
  reporters: [
    [
      "allure",
      {
        outputDir: "reports",
        // disableWebdriverStepsReporting: true,
        // disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure(["generate", "reports", "--clean"]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
        resolve();
      });
    });
  },
};
