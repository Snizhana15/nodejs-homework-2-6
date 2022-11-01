const sgMail = require("@sendgrid/mail");
const { SENDGRID_SECRET_KEY } = process.env;

const sendEmail = async data => {
  const mail = { ...data, from: "snischana15.05@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
