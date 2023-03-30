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
//import { Model, Document, Types } from 'mongoose';
const { CategoryModel } = require("../models/Category.model");
const { DishModel } = require("../models/Dish.model");
var express = require("express");
var CategoryRoute = express.Router();
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
CategoryRoute.get("/get", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield CategoryModel.find();
    res.status(200).send(data);
}));
CategoryRoute.get("/fetch", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10 } = req.query;
        const categories = yield CategoryModel.find({})
            .limit(+limit)
            .skip((+page - 1) * +limit)
            .exec();
        const result = [];
        for (const category of categories) {
            const dishes = yield DishModel.find({
                categoryId: category._id,
            }).exec();
            const dishArray = [];
            for (const dish of dishes) {
                dishArray.push({
                    dishName: dish.dishName,
                    dishDetail: dish.dishDetail,
                });
            }
            result.push({
                category: category.title,
                dishes: dishArray,
            });
        }
        const count = yield CategoryModel.countDocuments();
        const totalPages = Math.ceil(count / +limit);
        res.json({
            result,
            totalPages: totalPages === 0 ? 1 : totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
CategoryRoute.post("/post", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let title = req.body.title;
    let lowerCaseTitle = title.toLowerCase();
    let categoryAvailable = yield CategoryModel.findOne({
        title: lowerCaseTitle,
    });
    if (categoryAvailable) {
        res.status(403).send("category alredy exist");
    }
    else if (!req.body.title) {
        res.status(400).send("Please fill category");
    }
    else {
        CategoryModel.create({
            title: lowerCaseTitle,
            isActive: true
        });
        res.status(201).send("Category added successfully");
    }
}));
CategoryRoute.delete("/delete/:id", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCategory = yield DishModel.findOne({
            categoryId: req.params.id,
        });
        if (checkCategory) {
            res.status(403).send("First delete All Dishes");
        }
        else {
            yield CategoryModel.findByIdAndDelete({ _id: req.params.id });
            res.status(201).send("Category deleted");
        }
    }
    catch (error) {
        console.log(error);
    }
}));
CategoryRoute.put("/edit/:id", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield CategoryModel.findByIdAndUpdate({ _id: req.params.id }, { isActive: req.body.isActive });
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = {
    CategoryRoute,
};
//# sourceMappingURL=Category.route.js.map