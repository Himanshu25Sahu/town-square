import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const sendMail = async (ReciverMail) => {
  try {
    const verificationCode = generateVerificationCode();
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Ensure this is an "App Password"
      },
      // Added timeouts to prevent the ETIMEDOUT error
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000,
      socketTimeout: 15000,
    });

    await transporter.sendMail({
      from: '"🏙️ TownSquare Support Team 📬" <devchatapplication@gmail.com>',
      to: ReciverMail,
      subject: "TownSquare - Verify Your Email",
      text: `Welcome to TownSquare! 🚀\n\nYour verification code is: ${verificationCode}\n\nEnter this code to verify your account and start exploring your community.`,
      html: `<p>Welcome to <b>🏙️ TownSquare</b>! 🚀</p>
             <p>Your verification code is: <b>${verificationCode}</b></p>
             <p>Enter this code to verify your account and start connecting with your community.</p>
             <p>Need help? Contact our support team.</p>
             <p><b>TownSquare Team</b></p>`,
    });

    return verificationCode;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Throw the actual error so your controller can see the message
  }
};