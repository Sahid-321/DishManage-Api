import {Request,Response,NextFunction,Application} from "express"
const mongoose = require("mongoose")


const DishSchema = mongoose.Schema({
    categoryId:String,
    dishName: String,
    dishDetail: String,
    isActive:Boolean
  });
  const DishModel = mongoose.model("dish", DishSchema)

module.exports = {
    DishModel
}