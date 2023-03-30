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
const { UserModel } = require('../models/User.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.headers.authorization) {
        return res.send({ msg: "Please login again" });
    }
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    jwt.verify(token, process.env.KEY, function (err, decoded) {
        if (err) {
            res.send({ msg: "Please login" });
        }
        else {
            req.body.email = decoded.email;
            next();
        }
    });
});
//authorization for admin to post items in data base
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { email } = req.body;
        const user = yield UserModel.findOne({ email: email });
        if (user.role !== req.body.role) {
            res.send({ msg: "You are not authorised" });
        }
        else {
            const token = (_d = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
            jwt.verify(token, process.env.KEY, function (err, decoded) {
                if (err) {
                    res.send({ msg: "Please login" });
                }
                else {
                    req.body.email = decoded.email;
                    next();
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    authentication,
    authorization
};
//# sourceMappingURL=middleware.js.map