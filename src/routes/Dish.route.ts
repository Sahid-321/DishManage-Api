import { Request, Response, NextFunction, Application } from "express";
const { DishModel } = require("../models/Dish.model");
const {authentication} = require("../middleware/authentication")
const {authorization} = require("../middleware/authorization")
var express = require("express");
var DishRoute = express.Router();

DishRoute.post("/get", authentication, async (req: Request, res: Response) => {
  //pagination for dishes
  //const { page = 1, limit = 5 } = req.query;
  try {
    
    const DishData = await DishModel.find({ categoryId: req.body.id })
    // .limit(+limit)
    // .skip((+page - 1) * +limit)
    // .exec();

    const count = await DishModel.countDocuments();
    res.json({
      DishData,
      // totalPages: Math.ceil(count / +limit -1),
      // currentPage: page
    });

  } catch (error) {
    console.log(error)
  }

  

});

DishRoute.post("/post", authentication, authorization("super-admin"), async (req: Request, res: Response) => {
  let dishName = req.body.dishName;
  let lowerCaseDishName = dishName.toLowerCase()

  let dishAvailable = await DishModel.findOne({
    categoryId: req.body.categoryId,
    dishName: lowerCaseDishName
   
  });


  if (dishAvailable) {
    res.status(403).send("Dish already exist");
  } else if (!req.body.dishName) {
    res.status(400).send("Please fill dish");
  } else {
   
    try {
      await  DishModel.create({
        categoryId: req.body.categoryId,
        dishName: lowerCaseDishName,
      dishDetail: req.body.dishDetail,
      isActive: true
      });
       res.status(201).send("Dish added successfully");

    } catch (error) {
      console.log(error)
    }
  }

});

DishRoute.delete("/delete/:id",authentication, authorization("super-admin"), async (req: Request, res: Response) => {
  try {
  const isAvailable = await DishModel.findOne({_id: req.params.id})
  if(isAvailable){
    await DishModel.findByIdAndDelete({ _id: req.params.id });
    res.status(201).send("Dish deleted");
  }else if(!isAvailable){
    res.status(404).send("Dish already deleted")
  }
      
    }
   catch (error) {
    console.log(error);
  }
});

DishRoute.put("/edit/:id", authentication, authorization("super-admin"), async (req:Request, res:Response)=>{
try {
 const data:any =  await DishModel.findByIdAndUpdate(
    {_id: req.params.id},
    {isActive: req.body.isActive}
    )
 res.send(data)

} catch (error) {
  console.log(error)
}

})

module.exports = {
  DishRoute,
};
