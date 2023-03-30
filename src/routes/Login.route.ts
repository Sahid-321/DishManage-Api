const { UserModel } = require("../models/User.model")
const {Router} = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
import {Request,Response} from "express"
require("dotenv").config()

const LoginRoute = Router()

LoginRoute.post("/", async(req:Request,res:Response)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email:email})
    if(user)
    {
        const hash = user.password
        bcrypt.compare(password, hash, function(err:Error, result:any) {
            if(err)
            {
                console.log(err)
                res.send(500)
                res.send({msg:"Something went wrong"})
            }
            if(result)
            {
                jwt.sign({ email: email }, process.env.KEY, function(err:Error, token:string) {
                    if(err)
                    {
                        res.send(500)
                        res.send({msg:"Somethong went wrong"})
                    }else{
                        res.status(200)
                        res.send({msg:"Login Successfull",token:token, email})
                    }
                  });
            }else{
                res.status(401).send({msg:"Authentication failed"})
            }
        });

    }else{
        res.status(401).send({msg:"Authentication failed"})
    }
})

module.exports = {
    LoginRoute
}