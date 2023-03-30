const mongoose = require("mongoose");
require("dotenv").config();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 30000,
};
const connection = mongoose.connect(process.env.MONGO_URL, options);
module.exports = {
    connection
};
//# sourceMappingURL=db.js.map