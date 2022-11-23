const jwt = require('jsonwebtoken');
const User = require('../models/users') 

const auth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    var decode = await jwt.verify(token, process.env.SECRET_KEY);

    var user = await User.findById(decode._id);

    if (!user) {
      res.status(403).send("Unauthenticate");
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(403).send("Unauthenticate");
  }
};

module.exports = auth;
