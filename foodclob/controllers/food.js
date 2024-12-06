const Food = require("../models/fooditem");
// exposts.getAllFoodItems = (req, res) => {
//   Food.find({})
//     .then((food) => {
//       res.send({ status: "success,food" });
//     })
//     .catch((err) => {
//       res.send({ status: "error", message: err.message });
//     });
// };

function foodFilter(food, payload) {
  const {
    searchStr = "",
    maxPrice = Infinity,
    rating = 0,
    discount = 0,
    veg = false,
  } = payload;
  const search = searchStr.toLowerCase();
  return food.filter(
    (item) =>
      (item.name.includes(search) ||
        item.catagory.includes(search) ||
        item.description.includes(search)) &&
      item.price <= parseFloat(maxPrice) &&
      item.rating >= parseFloat(rating) &&
      item.discount <= parseFloat(discount) &&
      (!Boolean(veg) ? true : Boolean(item.isveg))
  );
}

// exports.getAllFoodsItems = (req, res) => {
//   Food.find({})
//     .then((food) => {
//       const data = foodFilter(food, req.params);
//       res.send({ status: "success", data });
//     })
//     .catch((err) => {
//       res.send({ status: "error", message: err.message });
//     });
// };

exports.getFooditems = (req, res) => {
  const { restoId = null } = req.params;
  if (restroId) {
    Food.find({ restroId })
      .then((food) => {
        const data = foodFilter(food, req.params);
        res.send({ status: "success", data });
      })
      .catch((err) => {
        res.send({ status: "error", message: err.message });
      });
  } else {
    Food.find({})
      .then((food) => {
        const data = foodFilter(food, req.params);
        res.send({ status: "success", data });
      })
      .catch((err) => {
        res.send({ status: "error", message: err.message });
      });
  }
};

exports.addFooditems = (req, res) => {
  const {
    name,
    category,
    avaiableQuantity,
    price,
    discount,
    description,
    details,
    image,
  } = req.body;
  const restroId = req.user._id;
  Food.create({
    restroId,
    name,
    category,
    avaiableQuantity,
    price,
    discount,
    details,
    image,
    description,
  })
    .then((food) => {
      res
        .status(201)
        .send({ food, status: "success", message: "Food is created " });
    })
    .catch((err) => {
      res.status(400).send({ status: "error", message: err.message, ...err });
    });
};

exports.UpdateFoddItem = (req, res) => {
  const {
    name,
    category,
    avaiableQuantity,
    price,
    discount,
    description,
    details,
    image,
  } = req.body;
  Food.findByIdAndUpdate(
    req.params.id,
    {
      name,
      category,
      avaiableQuantity,
      price,
      discount,
      description,
      details,
      image,
    },
    { new: true }
  )
    .then((food) => {
      return res
        .status(200)
        .send({ food, status: "success", message: "Food is updated" });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ status: "error", message: err.message, ...err });
    });
};

exports.deleteFoodItem = (req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then((food) => {
      return res
        .status(200)
        .send({ food, status: "success", message: "Food is deleted" });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ status: "error", message: err.message, ...err });
    });
};
