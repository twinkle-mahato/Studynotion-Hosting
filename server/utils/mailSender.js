const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // using nodemailer creates a transporter function, which is used to send emails.It requires configuration for the email server you want to use (SMTP settings)
    console.log("EMAIL:-", email, title, body);
    let transporter = nodemailer.createTransport({
      // pool: true,
      host: process.env.MAIL_HOST,
      secure: true,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log("transporter", transporter);

    let info = await transporter.sendMail({
      from: "StudyNotion - by Twinkle Mahato",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
