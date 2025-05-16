const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

module.exports.mailsend = async (body) => {
  let transport = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "ayushjaiswal7081@gmail.com",
      pass: "yniymxxyoquoxfrq"
    },
    logger: true,
    debug: process.env.SMTP_DEBUG,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailInfo = await transport.sendMail(body);
  if (!mailInfo) {
    console.log("Error occurred while sending email:");
    return false;
  } else {
    console.log('Email sent successfully!');
    return mailInfo;
  }
};
