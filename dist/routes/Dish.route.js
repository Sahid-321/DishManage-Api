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
const { DishModel } = require("../models/Dish.model");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
var express = require("express");
var DishRoute = express.Router();
DishRoute.post("/get", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //pagination for dishes
    //const { page = 1, limit = 5 } = req.query;
    try {
        const DishData = yield DishModel.find({ categoryId: req.body.id });
        // .limit(+limit)
        // .skip((+page - 1) * +limit)
        // .exec();
        const count = yield DishModel.countDocuments();
        res.json({
            DishData,
            // totalPages: Math.ceil(count / +limit -1),
            // currentPage: page
        });
    }
    catch (error) {
        console.log(error);
    }
}));
DishRoute.post("/post", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dishName = req.body.dishName;
    let lowerCaseDishName = dishName.toLowerCase();
    let dishAvailable = yield DishModel.findOne({
        categoryId: req.body.categoryId,
        dishName: lowerCaseDishName
    });
    if (dishAvailable) {
        res.status(403).send("Dish already exist");
    }
    else if (!req.body.dishName) {
        res.status(400).send("Please fill dish");
    }
    else {
        try {
            yield DishModel.create({
                categoryId: req.body.categoryId,
                dishName: lowerCaseDishName,
                dishDetail: req.body.dishDetail,
                isActive: true
            });
            res.status(201).send("Dish added successfully");
        }
        catch (error) {
            console.log(error);
        }
    }
}));
DishRoute.delete("/delete/:id", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAvailable = yield DishModel.findOne({ _id: req.params.id });
        if (isAvailable) {
            yield DishModel.findByIdAndDelete({ _id: req.params.id });
            res.status(201).send("Dish deleted");
        }
        else if (!isAvailable) {
            res.status(404).send("Dish already deleted");
        }
    }
    catch (error) {
        console.log(error);
    }
}));
DishRoute.put("/edit/:id", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DishModel.findByIdAndUpdate({ _id: req.params.id }, { isActive: req.body.isActive });
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = {
    DishRoute,
};
//# sourceMappingURL=Dish.route.js.map