const monogoose = require("mongoose");

const schema = new monogoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
      default: "",
    },
    details: {
      type: String,
      // required: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      // required:true
    },
    restoId: {
      type: monogoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    avaiableQuantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: monogoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          require: true,
        },
        reviews: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timeStamps: true }
);


const Food =monogoose.model("Food",schema);

module.exports = Food;