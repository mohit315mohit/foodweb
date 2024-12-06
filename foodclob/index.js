const express = require("express");
const { connectMongodb } = require("./utils/connection");
const server = express();
const router = require("./routes/user");
const foodrouter =require("./routes/food");
require("dotenv").config();
let PORT = process.env.PORT || 3030;

connectMongodb("foodweb");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/User",router);     ////////////////// change it
server.use("/food",foodrouter);    //////////// change it


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
