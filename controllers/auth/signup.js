const { User, schemas } = require("../../models/user");
const { requestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.signupShema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw requestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: result.email,
        " subscription": result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
