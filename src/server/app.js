"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routing_controllers_1 = require("routing-controllers");
const config_1 = require("./config");
let expressApp = express();
routing_controllers_1.useExpressServer(expressApp, {});
expressApp.use('/', express.static(config_1.config.staticFolder));
expressApp.use('/', express.static(config_1.config.nodeModulesFolder));
console.log(`Listening on port ${config_1.config.port}...`);
expressApp.listen(config_1.config.port);
//# sourceMappingURL=app.js.map