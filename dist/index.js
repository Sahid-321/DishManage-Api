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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { connection } = require("./config/db");
const { LoginRoute } = require("./routes/Login.route");
const { SignUpRouter } = require("./routes/SiginUp.route");
const { CategoryRoute } = require("./routes/Category.route");
const { DishRoute } = require("./routes/Dish.route");
const { BroadCast } = require("./routes/BroadCast.route");
const cors = require("cors");
const mongoose = require('mongoose');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = __importDefault(require("./swagger"));
require("dotenv").config();
mongoose.set('strictQuery', false);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({
    origin: '*'
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
//swagger ui
const options = {
    swaggerDefinition: swagger_1.default,
    apis: ['./dist/index.js'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
/**
 * @swagger
 * /:
 *   get:
 *     description:  get method is default to check whether this API is working or not
 *     responses:
 *       200:
 *         description: Response successful
 */
/**
 * @swagger
 * /login:
 *   post:
 *     description:  Follow above swagger ui get endpoint you will get email password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Response successful
 */
/**
 * @swagger
 * /category/get:
 *   get:
 *     description: You will get Category Lists.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secret message
 */
/**
 * @swagger
 * /category/post:
 *   post:
 *     description: You can add category on db.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 format: text
 *                 description: Enter category title
 *     responses:
 *       200:
 *         description: Secret message
 */
/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     description: "Delete a category"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "id"
 *         in: path
 *         description: "ID of the category to be deleted"
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: "Successful operation"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Category with id 1 has been deleted successfully."
 *       400:
 *         description: "Bad Request"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid category id."
 *       404:
 *         description: "Category not found"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Category with id 1 not found."
 */
/**
 * @swagger
 * /dish/get:
 *   post:
 *     description: You will get a dish by its category ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: text
 *                 description: Enter dish ID
 *     responses:
 *       200:
 *         description: Returns the requested dish.
 */
/**
 * @swagger
 * /dish/post:
 *   post:
 *     description: You can add new dishes by selecting category id where you need to add new dishes.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 format: text
 *                 description: Enter category ID
 *               dishName:
 *                 type: string
 *                 format: text
 *                 description: Enter dish name
 *               dishDetail:
 *                 type: string
 *                 format: text
 *                 description: Enter dish details
 *     responses:
 *       200:
 *         description: Returns the requested dish.
 */
/**
 * @swagger
 * /dish/delete/{id}:
 *   delete:
 *     description: "Delete a dish, by dish Id"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "id"
 *         in: path
 *         description: "ID of the dish to be deleted"
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: "Successful operation"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "dish with id 1 has been deleted successfully."
 *       400:
 *         description: "Bad Request"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Invalid dish id."
 *       404:
 *         description: "dish not found"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "dish with id 1 not found."
 */
/**
 * @swagger
 * /category/fetch:
 *   get:
 *     summary: Fetch a list of category items along with dishes with pagination and limit
 *     description: Fetch a list of category items along with dishes with pagination and limit
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// swagger ui- end
app.use("/signup", SignUpRouter);
app.use("/login", LoginRoute);
app.use("/category", CategoryRoute);
app.use("/dish", DishRoute);
//app.use("/",  BroadCast)
app.get('/', (req, res) => {
    res.send("For super-admin email: sahid@gmail.com, password: sahid for admin email:normal@gmail.com, password: normal");
});
const PORT = Number(process.env.PORT) || 8000;
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection;
        console.log("Connected to DB successfully");
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Server running on PORT ${PORT}`);
}));
//# sourceMappingURL=index.js.map