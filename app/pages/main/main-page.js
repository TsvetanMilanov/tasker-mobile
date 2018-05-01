"use strict";

const navigationService = require("../../services/navigation-service");
const MainViewModel = require("./main-view-model").MainViewModel;

const onNavigatingTo = (args) => {
    const page = args.object;
    const vm = new MainViewModel();
    page.bindingContext = vm;
    vm.checkForUser()
        .then(user => {
            if (!user) {
                return navigationService.goToLoginPage();
            }
        })
        .catch(err => {
            console.error("Check for user err: ", err);
            navigationService.goToLoginPage();
        });
};

exports.onNavigatingTo = onNavigatingTo;
