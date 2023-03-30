"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DishSchema = mongoose.Schema({
    categoryId: String,
    dishName: String,
    dishDetail: String,
    isActive: Boolean
});
const DishModel = mongoose.model("dish", DishSchema);
module.exports = {
    DishModel
};
//# sourceMappingURL=Dish.model.js.map