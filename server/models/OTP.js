const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	console.log("Sending OTP to email:", otp);
  try {
    const mailResponse = await mailSender(
      email,
      "Verification for Email",
      emailTemplate(otp)
    );
    console.log("Otp send successfully", mailResponse.response);
  } catch (err) {
    console.error("Error in send verification function in otp model", err);
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  if (this.isnew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("Otp", OTPSchema);
