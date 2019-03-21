import * as express from 'express';
import {useExpressServer} from "routing-controllers";
import {config} from "./config";

let expressApp = express();
useExpressServer(expressApp, {
});

expressApp.use('/', express.static(config.staticFolder));
console.log(config.staticFolder);
console.log(`Listening on port ${config.port}...`);
expressApp.listen(config.port);