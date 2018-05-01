"use strict";

const frame = require("tns-core-modules/ui/frame");

class NavigationService {
    goToMainAndClearHistory() {
        return frame.topmost().navigate({
            clearHistory: true,
            moduleName: "pages/main/main-page"
        });
    }

    goToLoginPage() {
        return frame.topmost().navigate("pages/login/login-page");
    }
}

module.exports = new NavigationService();
