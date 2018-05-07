"use strict";

const http = require("http");

const constants = require("../constants/constants");
const localStorage = require("./local-storage");
const config = require("./config-service");

const userService = config.getUsersServiceUrl();

class UserService {
    saveUserToken(tokenInfo) {
        return localStorage.setValue(constants.UserTokenLocalStorageKey, tokenInfo);
    }

    saveUserInfo(userInfo) {
        return localStorage.setValue(constants.UserLocalStorageKey, userInfo);
    }

    clearUserToken() {
        return localStorage.removeValue(constants.UserTokenLocalStorageKey);
    }

    clearUserInfo() {
        return localStorage.removeValue(constants.UserLocalStorageKey);
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            const userInfo = localStorage.getValue(constants.UserLocalStorageKey);
            if (userInfo) {
                return resolve(userInfo);
            }

            const userToken = this.getUserToken();
            if (!userToken) {
                return resolve(null);
            }

            const req = {
                url: userService + "/me",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken.access_token}`
                }
            };

            return http.request(req)
                .then(res => {
                    if (res.statusCode >= 400) {
                        return reject(res.content ? res.content.toJSON() : new Error("http error"));
                    }

                    let user;
                    if (res.content.toJSON) {
                        user = res.content.toJSON();
                    } else {
                        user = res.content;
                    }

                    this.saveUserInfo(user);
                    resolve(user);
                }, reject)
                .catch(reject);
        });
    }

    getUserToken() {
        const tInfo = localStorage.getValue(constants.UserTokenLocalStorageKey);
        if (tInfo) {
            let result = new TokenInfo();
            result = tInfo;
            return result;
        }

        return null;
    }
}

class TokenInfo {
    constructor() {
        this.access_token = "";
        this.refresh_token = "";
        this.id_token = "";
        this.expires_in = 0;
        this.token_type = "";
        this.scope = [];
    }
}

module.exports = new UserService();
