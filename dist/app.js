"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Routes_1 = require("./routes/Routes");
const mongoose = require("mongoose");
const SecurityConfig_1 = require("./config/SecurityConfig");
class App {
    //public mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';
    constructor() {
        this.security = new SecurityConfig_1.SecurityModule();
        this.app = express();
        this.routePrv = new Routes_1.Routes();
        this.mongoUrl = 'mongodb://localhost/GameUnity';
        this.app.set('Secret', this.security.SecurityKey());
        // use morgan to log requests to the console
        //this.app.use(morgan('dev'));
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Configurar cabeceras y cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        // serving static files 
        this.app.use(express.static('public'));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {});
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map