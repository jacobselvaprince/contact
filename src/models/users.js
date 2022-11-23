const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  names: {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 1000000000,
    maxlength: 9999999999,
  },
  occupation: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
