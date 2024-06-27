const FuturesUtils = require('../../resources/utils/FuturesUtils');

class FuturesActions {
    constructor() {
        this.isQA = FuturesUtils.getUserData(this.getLoginAccount()).isQA;
    }

    static loginAccount = 'NO3';

    static getLoginAccount() {
        return this.loginAccount;
    }

    static setLoginAccount(loginAccount) {
        this.loginAccount = loginAccount;
    }

    static changeAppEnv() {
        if (this.getPlatformName().toLowerCase() === 'android') {
            this.moveDoraemonIconDown();
            this.cancelBinanceUS();
            this.openDoKit();
            this.disableNetworkSwitchAndChangeEnv();
            this.closeLocationOfResidence();
        } else {
            this.clickAllowButton();
            this.wait(1);
            this.clickAllowButton();
            this.cancelBinanceUS();
            this.closeLocationOfResidence();
            this.cancelUpdate();
            this.openDoKit();
            this.disableNetworkSwitchAndChangeEnv();
            this.closeWelcomeLitePopup();
        }
    }
}

module.exports = FuturesActions;
