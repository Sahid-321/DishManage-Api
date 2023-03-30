var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bcrypt = require('bcryptjs');
const { UserModel } = require('../models/User.model');
const SignUpRouter = express.Router();
SignUpRouter.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        const present = yield UserModel.findOne({ email: email });
        if (present) {
            res.status(403).send({ msg: 'User already exists' });
        }
        else {
            bcrypt.hash(password, 6, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500).send({ msg: 'Something went wrong' });
                    }
                    else {
                        const data = new UserModel({ email: email, password: hash, role: role });
                        yield data.save();
                        res.status(201).send({ msg: 'Account created successfully' });
                    }
                });
            });
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500).send({ msg: 'Something went wrong' });
    }
}));
module.exports = {
    SignUpRouter,
};
//# sourceMappingURL=SiginUp.route.js.map