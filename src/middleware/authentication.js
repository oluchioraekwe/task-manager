const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokenKey = process.env.TOKEN;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, tokenKey);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send({ error: "Please authentication. " });
  }
};

module.exports = auth;
