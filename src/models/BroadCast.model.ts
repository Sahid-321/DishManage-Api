import {Request,Response,NextFunction,Application} from "express"
const mongoose = require('mongoose');

const BroadCastSchema = mongoose.Schema({
    template: String,
    endMsg: String
})
const BroadCastModel = mongoose.model("broadcast", BroadCastSchema);

module.exports = {
    BroadCastModel
}