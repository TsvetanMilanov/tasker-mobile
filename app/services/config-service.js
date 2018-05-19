"use strict";

class ConfigService {
    constructor() {
        this._config = require("../env/env.json");
    }

    getAuthorizeEndpoint() {
        return this._config["AuthorizeEndpoint"];
    }

    getAuthClientId() {
        return this._config["AuthClientId"];
    }

    getUsersServiceUrl() {
        return this._config["UsersServiceUrl"];
    }
}

module.exports = new ConfigService();
