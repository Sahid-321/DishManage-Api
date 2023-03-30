import { Request, Response, NextFunction, Application } from "express";
const {UserModel} = require('../models/User.model')
const jwt = require('jsonwebtoken');
require("dotenv").config()

const authentication = async (req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization){
        return res.send({msg:"Please login again"})
    }
    const token = req.headers?.authorization?.split(" ")[1]
   // console.log(req.headers)
    
    jwt.verify(token, process.env.KEY, function(err:Error, decoded:any) {
        if(err)
        {
            res.send({msg:"Please login"})
        }else{
            req.body.email = decoded.email
            next()
        }
    });
    
}

module.exports = {
    authentication
}