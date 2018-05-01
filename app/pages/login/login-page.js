"use strict";

const wv = require("tns-core-modules/ui/web-view");

const navigationService = require("../../services/navigation-service");
const LoginViewModel = require("./login-view-model").LoginViewModel;

const onNavigatingTo = (args) => {
    const page = args.object;
    const vm = new LoginViewModel();
    page.bindingContext = vm;

    const loginWebView = page.getViewById("login-web-view");
    loginWebView.on(wv.WebView.loadFinishedEvent, data => {
        if (data.url) {
            const result = vm.handleLoginResponse(data.url);
            if (result) {
                return navigationService.goToMainAndClearHistory();
            }
        }
    });
};

exports.onNavigatingTo = onNavigatingTo;
