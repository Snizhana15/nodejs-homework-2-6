const { User, schemas } = require("../../models/user");
const { requestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginShema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw requestError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw requestError(401, "Email not verify");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw requestError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email: email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
