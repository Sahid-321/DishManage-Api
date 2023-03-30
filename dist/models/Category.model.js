"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
    title: String,
    isActive: Boolean
});
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = {
    CategoryModel
};
//# sourceMappingURL=Category.model.js.map