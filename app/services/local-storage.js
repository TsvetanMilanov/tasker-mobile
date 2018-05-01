"use strict";

const appSettings = require("application-settings");

class LocalStorage {
    getValue(key) {
        if (appSettings.hasKey(key)) {
            return JSON.parse(appSettings.getString(key));
        }
    }

    setValue(key, v) {
        return appSettings.setString(key, JSON.stringify(v));
    }

    removeValue(key) {
        return appSettings.remove(key);
    }
}

module.exports = new LocalStorage();
