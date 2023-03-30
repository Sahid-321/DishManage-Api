"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const BroadCastSchema = mongoose.Schema({
    template: String,
    endMsg: String
});
const BroadCastModel = mongoose.model("broadcast", BroadCastSchema);
module.exports = {
    BroadCastModel
};
//# sourceMappingURL=BroadCast.model.js.map