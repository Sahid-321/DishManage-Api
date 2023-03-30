import { Request, Response } from "express";
const axios = require("axios");
const express = require("express");
const BroadCast = express.Router();
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const { BroadCastModel } = require("../models/BroadCast.model");
require("dotenv").config()


BroadCast.post("/broadcast", authentication,
  async (req: Request, res: Response) => {
    try {
      const { dishes } = req.body;
      const token = process.env.TOKEN
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("", {
          headers,
        })
        .then((response: any) => {
          let elementArray: any[] = [];

          response.data.messageTemplates.filter((elem: any) => {
            return elem.category === "ALERT_UPDATE";
          }).map((elem: any) => {

            let string = elem.bodyOriginal;
            string = string.replace("{{items}}", dishes);
            let objectData = {
              elementName: elem.elementName,
              bodyOriginal: string,
              dishes: dishes,
            };
            elementArray.push(objectData);


          });
          res.send(elementArray);
        })

        .catch((error: Error) => {
          res.send(error);
        });

      // fetch data from api
    } catch (error) {
      console.log(error);
    }
  }
);

//final broadcast
BroadCast.post("/final-broadcast", authentication,
  async (req: Request, res: Response) => {
    try {
      const { dishes, elementName } = req.body;
      const token = process.env.TOKEN

      const whatsAppNumber = "919005784046";
      let obj = {
        template_name: elementName,
        broadcast_name: "1111",
        parameters: [
          {
            name: "items",
            value: dishes,
          },
        ],
      };

      await axios
        .post(
          ``,
          obj,
          { headers: { Authorization: `Bearer ${token && token}` } }
        )
        .then((item: any) => res.send("Message sent successfully"))
        .catch((err: Error) => console.log(err));

    } catch (error) {
      console.log(error);
    }
  }
);

BroadCast.get("/bget", async (req: Request, res: Response) => {
  const { dishes, elementName } = req.body;

  const token = process.env.TOKEN
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  let arr: any[] = []
  axios
    .get("", {
      headers,
    })
    .then((response: any) => {

      response.data.contact_list.map((elem: any) => {


        let obj = {
          template_name: "elementName",
          broadcast_name: "1111",
          parameters: [
            {
              whatsAppNumber: elem.phone,
              name: "items",
              value: "dishes"
            }
          ]
        }
        arr.push(obj)


      });
      // const arr = [/* your array of 40 items */];
      const n = 10; // the number of items per subarray
      const result = [];

      for (let i = 0; i < arr.length; i += n) {
        const subarray = arr.slice(i, i + n);
        result.push( subarray );
        
      }

      result.map((elem:any)=>{
        elem.map((d:any)=>{
          console.log(d)
        })
        console.log("------------------------------------------------")

      })
      axios.post(`api`)

    })
    .catch((error: Error) => {
      console.log(error);
    });
})


//create template

BroadCast.post(
  "/template",
  authentication,
  authorization("super-admin"),
  async (req: Request, res: Response) => {
    try {
      await BroadCastModel.create({
        template: req.body.template,
        endMsg: req.body.endMsg,
      });
      res.send("Template added on DB");
    } catch (error) {
      console.log(error);
    }
  }
);

BroadCast.get(
  "/get-template",
  authentication,
  async (req: Request, res: Response) => {
    try {
      const broadData = await BroadCastModel.find();
      res.status(200).send(broadData);
    } catch (error) {
      console.log(error);
    }
  }
);

BroadCast.get(
  "/get-template/:id",
  authentication,
  async (req: Request, res: Response) => {
    try {
      const broadData = await BroadCastModel.findOne({
        _id: req.params.id,
      });
      res.status(200).send(broadData);
    } catch (error) {
      console.log(error);
    }
  }
);

BroadCast.put(
  "/update-template/:id",
  authentication,
  authorization("super-admin"),
  async (req: Request, res: Response) => {
    await BroadCastModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        template: req.body.template,
        endMsg: req.body.endMsg,
      }
    );
  }
);

module.exports = {
  BroadCast,
};
