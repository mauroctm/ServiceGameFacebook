"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userModel_1 = require("../models/userModel");
const SecurityConfig_1 = require("../config/SecurityConfig");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const user = mongoose.model('User', userModel_1.User);
let security = new SecurityConfig_1.SecurityModule();
class AuthController {
    createUser(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }, (error, user) => {
            if (error) {
                return res.status(500).send({ message: "There was a problem registering the user.", error: error });
            }
            // create a token
            var token = jwt.sign({ id: user._id }, security.SecurityKey(), {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
    }
    decodeToken(req, res) {
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, security.SecurityKey(), function (err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            res.status(200).send(decoded);
        });
    }
    login(req, res) {
        user.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Error on the server.' });
            }
            if (!user) {
                return res.status(404).send({ auth: false, message: 'No user found.' });
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }
            var token = jwt.sign({ id: user._id }, security.SecurityKey(), {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: true, token: token, user: user });
        });
    }
    logout(req, res) {
        return res.status(200).send({ auth: false, token: null });
    }
    updateUser(req, res) {
        var token = req.headers['x-access-token'];
        var userID = "";
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, security.SecurityKey(), function (err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            userID = decoded.id;
        });
        user.findOneAndUpdate({ _id: userID }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map