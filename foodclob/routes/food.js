const express = require("express");
const {
  getFooditems,
  addFooditems,
  UpdateFoddItem,
  deleteFoodItem,
} = require("../controllers/food");
const giveAccess=require("../middlewares/access")

const foodrouter = express.Router();

foodrouter.get("/food", getFooditems);
foodrouter.post("/food",giveAccess(["ADMIN","SUPER ADMINE"]), addFooditems);
foodrouter.patch("/food/:id",giveAccess(["ADMIN","SUPER ADMINE"]), UpdateFoddItem);
foodrouter.delete("/food/:id",giveAccess(["ADMIN","SUPER ADMINE"]), deleteFoodItem);

module.exports = foodrouter;
