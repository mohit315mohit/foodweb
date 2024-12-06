const mongoose = require("mongoose");

const userScheam = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["superadmin", "admin", "customer"], /// full caps
    },
  },
  { timesstamps: true }
);
const User = mongoose.model("foodweb", userScheam);

module.exports = User;
