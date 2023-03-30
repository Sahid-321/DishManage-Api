import {Request,Response,NextFunction,Application} from "express"
const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    title:String,
    isActive: Boolean
  });
  const CategoryModel = mongoose.model("category", CategorySchema)

module.exports = {
    CategoryModel
}