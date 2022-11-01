const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Confirmation of registration on the website",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/:${verificationToken}">Click to confirm</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
