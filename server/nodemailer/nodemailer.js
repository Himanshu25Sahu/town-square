import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const sendMail = async (ReciverMail) => {
  try {
    const verificationCode = generateVerificationCode();

    const { data, error } = await resend.emails.send({
      from: 'TownSquare Support <onboarding@resend.dev>', // Change to your verified domain later
      to: ReciverMail,
      subject: "TownSquare - Verify Your Email",
      text: `Welcome to TownSquare! 🚀\n\nYour verification code is: ${verificationCode}\n\nEnter this code to verify your account and start exploring your community.`,
      html: `<p>Welcome to <b>🏙️ TownSquare</b>! 🚀</p>
             <p>Your verification code is: <b>${verificationCode}</b></p>
             <p>Enter this code to verify your account and start connecting with your community.</p>
             <p>Need help? Contact our support team.</p>
             <p><b>TownSquare Team</b></p>`,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    console.log("Email sent successfully via Resend:", data?.id);

    return verificationCode;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Let your controller catch and respond (e.g., 500 error)
  }
};