"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: String,
    password: String,
    role: String
});
const UserModel = mongoose.model("user", userSchema);
module.exports = {
    UserModel
};
//# sourceMappingURL=User.model.js.map