const User = require("../models/user");
const { getToken } = require("../utils/auth");
const { comparePassword } = require("../utils/hash");

exports.signupUser = (req, res) => {
  const { name, username, password, email } = req.body;
  User.create({ name, username, password, email })
    .then((user) => {
      res.status(201).send({
        user,
        status: "success",
        message: "User created successfully",
      });
    })
    .catch((error) => {
      res.status(400).send({ status: "error", message: error.message });
    });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  User.find({ username })
    .then((user) => {
      if (!user || user.length === 0) {
        return res
          .status(404)
          .send({ status: "error", message: "plz enter username" });
        }
        // const isPasswordValid=comparePassword(password,users[0].password);
      const token = getToken(user[0]);
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return res
        .status(200)
        .cookie("token", token, {
          expires,
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          priority: "High",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send({
          user,
          status: "success",
          message: "User logged in successfully",
          token,
        });
    })
    .catch((error) => {
      res.status(400).send({
        status: "error",
        error: true,
        message: "user login failed...........",
      });
    });
};
