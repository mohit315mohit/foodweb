const { verifyToken } = require("../utils/auth");

exports.checkauth = (req, res, next) => {
  const cookietoken = req.cookies.token ?? "";
  const headerToken = req.headers.authorization?.split(" ")[1] ?? "";
  const token = cookietoken || headerToken;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed", error: "fail" });
  } else {
    const user = verifyToken(token);
    req.user = user;
    next();
  }
};
