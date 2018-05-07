"use strict";

const userService = require("../../services/user-service");
const config = require("../../services/config-service");

const loginResponseRegExp = /login_response=(.*)/;

class LoginViewModel {
    constructor() {
        this._loginResponses = {};
    }

    handleLoginResponse(url) {
        const match = loginResponseRegExp.exec(url);
        if (match && match.length > 0) {
            const res = this._base64Decode(match[1]);
            // For some reason we get here two times with the same code.
            // The problem is in the WebView.
            if (!this._loginResponses[res]) {
                const tokenInfo = JSON.parse(res);
                userService.saveUserToken(tokenInfo);
                this._loginResponses[res] = true;
                return true;
            }
        }

        return false;
    }

    getLoginUrl() {
        const loginUrl = `${config.getAuthorizeEndpoint()}?response_type=code&scope=${this._getScopes()}&client_id=${config.getAuthClientId()}&redirect_uri=${this.getRedirectUrl()}`;
        return loginUrl;
    }

    getRedirectUrl() {
        return `${config.getAuthServiceUrl()}/callback`;
    }

    _getScopes() {
        return "openid email offline_access";
    }

    _base64Decode(t) {
        const text = new java.lang.String(t);
        const data = text.getBytes("UTF-8");
        const decoded = android.util.Base64.decode(text, android.util.Base64.DEFAULT);
        return new java.lang.String(decoded, "UTF-8");
    }
}

exports.LoginViewModel = LoginViewModel;
