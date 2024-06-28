class LogoutPage {
    get logoutPopUp() { return $('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout');}
    get logoutBtn() { return $('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]');}
    get logoutInfo() { return $('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView');}
    get successLogoutPrompt() { return $('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button');}

    async waitForLogoutPopup() {
        await this.logoutPopUp.waitForExist({ timeout: 30000 });
        await this.logoutBtn.waitForExist({ timeout: 30000 });
    }

    async getLogoutButtonText() {
        return await this.logoutBtn.getText();
    }

    async confirmLogout() {
        await this.logoutBtn.touchAction('tap');
    }

    async getLogoutSuccessText() {
        await this.logoutInfo.waitForExist({ timeout: 30000 });
        return await this.logoutInfo.getText();
    }

    async confirmLogoutSuccessPrompt() {
        await this.successLogoutPrompt.touchAction('tap');
    }
}

module.exports = new LogoutPage();
