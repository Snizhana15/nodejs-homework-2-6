const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

const signupShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});
const loginShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const schemas = {
  signupShema,
  loginShema,
};
const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
