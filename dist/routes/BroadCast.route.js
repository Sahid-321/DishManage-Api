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
const axios = require("axios");
const express = require("express");
const BroadCast = express.Router();
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const { BroadCastModel } = require("../models/BroadCast.model");
require("dotenv").config();
BroadCast.post("/broadcast", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishes } = req.body;
        const token = process.env.TOKEN;
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios
            .get("", {
            headers,
        })
            .then((response) => {
            let elementArray = [];
            response.data.messageTemplates.filter((elem) => {
                return elem.category === "ALERT_UPDATE";
            }).map((elem) => {
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
            .catch((error) => {
            res.send(error);
        });
        // fetch data from api
    }
    catch (error) {
        console.log(error);
    }
}));
//final broadcast
BroadCast.post("/final-broadcast", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishes, elementName } = req.body;
        const token = process.env.TOKEN;
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
        yield axios
            .post(``, obj, { headers: { Authorization: `Bearer ${token && token}` } })
            .then((item) => res.send("Message sent successfully"))
            .catch((err) => console.log(err));
    }
    catch (error) {
        console.log(error);
    }
}));
BroadCast.get("/bget", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dishes, elementName } = req.body;
    const token = process.env.TOKEN;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let arr = [];
    axios
        .get("", {
        headers,
    })
        .then((response) => {
        response.data.contact_list.map((elem) => {
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
            };
            arr.push(obj);
        });
        // const arr = [/* your array of 40 items */];
        const n = 10; // the number of items per subarray
        const result = [];
        for (let i = 0; i < arr.length; i += n) {
            const subarray = arr.slice(i, i + n);
            result.push(subarray);
        }
        result.map((elem) => {
            elem.map((d) => {
                console.log(d);
            });
            console.log("------------------------------------------------");
        });
        axios.post(`api`);
    })
        .catch((error) => {
        console.log(error);
    });
}));
//create template
BroadCast.post("/template", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BroadCastModel.create({
            template: req.body.template,
            endMsg: req.body.endMsg,
        });
        res.send("Template added on DB");
    }
    catch (error) {
        console.log(error);
    }
}));
BroadCast.get("/get-template", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const broadData = yield BroadCastModel.find();
        res.status(200).send(broadData);
    }
    catch (error) {
        console.log(error);
    }
}));
BroadCast.get("/get-template/:id", authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const broadData = yield BroadCastModel.findOne({
            _id: req.params.id,
        });
        res.status(200).send(broadData);
    }
    catch (error) {
        console.log(error);
    }
}));
BroadCast.put("/update-template/:id", authentication, authorization("super-admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield BroadCastModel.findByIdAndUpdate({ _id: req.params.id }, {
        template: req.body.template,
        endMsg: req.body.endMsg,
    });
}));
module.exports = {
    BroadCast,
};
//# sourceMappingURL=BroadCast.route.js.map