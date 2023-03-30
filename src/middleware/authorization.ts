
import { Request, Response, NextFunction, Application } from "express";
const { UserModel } = require("../models/User.model")

const authorization = (Role:any)=>{

    return async (req:Request,res:Response,next:NextFunction)=>{
      
        const {email} = req.body
        const user = await UserModel.findOne({email:email})
       // console.log(user)
        if(user.role !== Role)
        {
            res.status(401).send("You are not authorised, Please contact to super admin")
        }else
        {
            next()
        }
    }
}

module.exports = {
    authorization
}