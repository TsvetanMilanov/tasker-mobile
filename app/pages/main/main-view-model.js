"use strict";

const Observable = require("tns-core-modules/data/observable").Observable;
const userService = require("../../services/user-service");
const navigationService = require("../../services/navigation-service");

class MainViewModel extends Observable {
    constructor() {
        super();
        this.isLoading = true;
        this.userPicture = "";
    }

    checkForUser() {
        return userService.getUserInfo()
            .then(u => {
                if (u) {
                    this.setUserPicture(u.picture);
                    this.setIsLoading(false);
                }

                return u;
            })
    }

    logout() {
        this.setUserPicture("");
        userService.clearUserToken();
        userService.clearUserInfo();
        navigationService.goToMainAndClearHistory();
    }

    setIsLoading(v) {
        return this.set("isLoading", v);
    }

    setUserPicture(url) {
        this.set("userPicture", url);
    }
}

module.exports.MainViewModel = MainViewModel;
