"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controllers/AuthController");
class Routes {
    constructor() {
        this.authController = new AuthController_1.AuthController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.post('/api/user', (req, res) => {
            this.authController.createUser(req, res);
        });
        app.get('/api/user', (req, res) => {
            this.authController.decodeToken(req, res);
        });
        app.post('/api/login', (req, res) => {
            this.authController.login(req, res);
        });
        app.get('/api/logout', (req, res) => {
            this.authController.logout(req, res);
        });
        app.put('/api/user', (req, res) => {
            this.authController.updateUser(req, res);
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map