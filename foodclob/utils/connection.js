const mongoose = require("mongoose");

exports.connectMongodb = (databaseName="") => {
  const connectionURL = `${process.env.MURL}/${process.env.MNAME || databaseName}`;
  mongoose
    .connect(connectionURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};
