const jwt = require("jsonwebtoken");

exports.getToken = (userdata) => {
  return jwt.sign(
    {
      _id: userdata._id,
      username: userdata.username,
      email: userdata.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.getUser = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
