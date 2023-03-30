import { Request, Response } from "express";
//import { Model, Document, Types } from 'mongoose';
const { CategoryModel } = require("../models/Category.model");
const { DishModel } = require("../models/Dish.model");
var express = require("express");
var CategoryRoute = express.Router();
const { authentication} = require("../middleware/authentication");
const { authorization} = require("../middleware/authorization");


CategoryRoute.get("/get", authentication,async (req: Request, res: Response) => {
  let data = await CategoryModel.find();
  res.status(200).send(data);
});

CategoryRoute.get("/fetch", authentication,
  async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const categories = await CategoryModel.find({})
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .exec();

      const result = [];
      for (const category of categories) {
        const dishes = await DishModel.find({
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
      const count = await CategoryModel.countDocuments();
      const totalPages = Math.ceil(count / +limit);
      res.json({
        result,
        totalPages: totalPages === 0 ? 1 : totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

CategoryRoute.post("/post", authentication, authorization("super-admin"),
  async (req: Request, res: Response) => {
    let title = req.body.title;
    let lowerCaseTitle = title.toLowerCase();
    let categoryAvailable = await CategoryModel.findOne({
      title: lowerCaseTitle,
    });

    if (categoryAvailable) {
      res.status(403).send("category alredy exist");
    } else if (!req.body.title) {
      res.status(400).send("Please fill category");
    } else {
      CategoryModel.create({
        title: lowerCaseTitle,
        isActive: true
      });
      res.status(201).send("Category added successfully");
    }
  }
);

CategoryRoute.delete("/delete/:id", authentication, authorization("super-admin"),
 async (req: Request, res: Response) => {
  try {
    const checkCategory = await DishModel.findOne({
      categoryId: req.params.id,
    });
    if (checkCategory) {
      res.status(403).send("First delete All Dishes");
    } else {
      await CategoryModel.findByIdAndDelete({ _id: req.params.id });
      res.status(201).send("Category deleted");
    }
  } catch (error) {
    console.log(error);
  }
});


CategoryRoute.put("/edit/:id", authentication, authorization("super-admin"), async (req:Request, res:Response)=>{
  try {
   const data:any =  await CategoryModel.findByIdAndUpdate(
      {_id: req.params.id},
      {isActive: req.body.isActive}
      )
  res.send(data)
  
  } catch (error) {
    console.log(error)
  }
  
  })

module.exports = {
  CategoryRoute,
};
