/* eslint-disable no-console */
let {join} = require("path");
const allure = require("allure-commandline");
const list = require("./test.suite.android.js");
const {exec} = require('child_process');

const localCapabilities = {
    platformName: "Android", // or "iOS"
    "appium:deviceName": "Samsung Galaxy A52S",
    "appium:udid": "R5CT138MKGV", // or "iPhone Simulator"
    "appium:automationName": "UiAutomator2", // or "XCUITest"
    "appium:appPackage": "com.saucelabs.mydemoapp.rn", // Replace with your app's package name
    "appium:appActivity": "com.saucelabs.mydemoapp.rn.MainActivity",
    "appium:noReset": true,
};

function killAppium() {
    return new Promise((resolve, reject) => {
        let command;

        if (process.platform === 'win32') {
            // Command for Windows to find the Appium process
            command = 'for /f "tokens=5" %a in (\'netstat -aon ^| findstr :4723\') do taskkill /F /PID %a';
        } else if (process.platform === 'darwin' || process.platform === 'linux') {
            // Command for MacOS and Linux
            command = 'pkill -f appium';
        } else {
            reject(new Error('Unsupported OS'));
            return;
        }

        console.log(`Executing command: ${command}`);
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error killing Appium process: ${err.message}`);
                console.error(`stderr: ${stderr}`);
                resolve(); // Resolve even if there's an error to avoid blocking
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`Appium process killed successfully.`);
                resolve(stdout);
            }
        });
    });
}


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
    onPrepare: async function (config, capabilities) {
        console.log('Killing any existing Appium server instances...');
        try {
            await killAppium();
            console.log('Appium server instances killed successfully.');
        } catch (err) {
            console.error('Failed to kill Appium server instances:', err);
        }
        console.log('onPrepare hook completed. Proceeding with tests...');
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
