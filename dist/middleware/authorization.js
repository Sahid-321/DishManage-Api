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
const authorization = (Role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const user = yield UserModel.findOne({ email: email });
        // console.log(user)
        if (user.role !== Role) {
            res.status(401).send("You are not authorised, Please contact to super admin");
        }
        else {
            next();
        }
    });
};
module.exports = {
    authorization
};
//# sourceMappingURL=authorization.js.map