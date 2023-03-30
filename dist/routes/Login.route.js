"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { UserModel } = require("../models/User.model");
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require("dotenv").config();
const LoginRoute = Router();
LoginRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel.findOne({ email: email });
    if (user) {
        const hash = user.password;
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                console.log(err);
                res.send(500);
                res.send({ msg: "Something went wrong" });
            }
            if (result) {
                jwt.sign({ email: email }, process.env.KEY, function (err, token) {
                    if (err) {
                        res.send(500);
                        res.send({ msg: "Somethong went wrong" });
                    }
                    else {
                        res.status(200);
                        res.send({ msg: "Login Successfull", token: token, email });
                    }
                });
            }
            else {
                res.status(401).send({ msg: "Authentication failed" });
            }
        });
    }
    else {
        res.status(401).send({ msg: "Authentication failed" });
    }
}));
module.exports = {
    LoginRoute
};
//# sourceMappingURL=Login.route.js.map