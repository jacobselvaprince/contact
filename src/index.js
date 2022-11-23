require("dotenv").config();
require("./db/mongoose");

const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();
const User = require("./models/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// User login
app.post("/api/login", async function (req, res) {
  var user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    console.log(user);
    res.status(400).send("Invalid credentials");
    return;
  }

  var match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    res.status(400).send("Invalid credentials");
    return;
  }

  var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).send({
    msg: "Logged in Successfully",
    token,
  });
});

// To save/register a user
app.post("/api/users", async function (req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    var user = new User(req.body);
    await user.save();

    var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).send({
      msg: "User registered successfully",
      user,
      token,
    });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// To get all users
app.get("/api/users", auth, async function (req, res) {
  try {
    var users = await User.find(req.query);
    res.status(200).send({
      msg: "All users record",
      users,
    });
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

// To update a user
app.put("/api/users/:id", auth, async function (req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).send({
      msg: "User updated successfully",
    });
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

// To delete a user
app.delete("/api/users/:id", auth, async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      msg: "User deleted successfully",
    });
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

app.listen(process.env.PORT || 7000, function () {
  console.log("The server upon port: 7000");
});