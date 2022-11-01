const { User, schemas } = require("../../models/user");
const { requestError, createVerifyEmail, sendEmail } = require("../../helpers");

const resendVerify = async (req, res, next) => {
  try {
    const { error } = schemas.verifyEmailShema.validate(req.body);
    if (error) {
      throw requestError(400, "missing required field email");
    }
    const { email } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      throw requestError(400, "Email not found");
    }
    if (user.verify) {
      throw requestError(400, "Verification has already been passed");
    }
    const mail = createVerifyEmail(email, user.verificationToken);
    await sendEmail(mail);
    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
