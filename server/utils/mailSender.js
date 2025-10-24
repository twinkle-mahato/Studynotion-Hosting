const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // // using nodemailer creates a transporter function, which is used to send emails.It requires configuration for the email server you want to use (SMTP settings)
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // transporter.verify((error, success) => {
    //   if (error) {
    //     console.error("❌", error);
    //   } else {
    //     console.log("✅", success);
    //   }
    // });

    let info = await transporter.sendMail({
      from: "StudyNotion - by Twinkle Mahato",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
