import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import OTPRepository from "./otp.repository.js";
import UserRepository from "../user/user.repository.js";

export default class OTPController {
  constructor() {
    this.otpRepository = new OTPRepository();
    this.userRepository = new UserRepository();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "aniketsangale2003@gmail.com",
        pass: process.env.EMAIL_PASS || "lchs xzyt rlzz fwlo",
      },
    });
  }

  // Function to send otp
  async sendOtp(req, res, next) {
    try {
      const userId = req.userId;
      const { email } = req.body;
      const user = await this.userRepository.findUser(email, userId);
      if (!user) {
        return res.status(400).send("User not found.");
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Save the OTP in the database
      await this.otpRepository.removeOldOtps(user._id); // Remove old OTPs
      await this.otpRepository.createOtp(user._id, otp);

      // Send OTP via email
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
      });

      return res.status(200).send("OTP sent successfully.");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to verify otp
  async verifyOtp(req, res, next) {
    try {
      const userId = req.userId;
      const { email, otp } = req.body;
      const user = await this.userRepository.findUser(email, userId);
      if (!user) {
        return res.status(404).send("User not found.");
      }

      const isValid = await this.otpRepository.verifyOtp(user._id, otp);
      if (!isValid) {
        return res.status(400).send("Invalid or expired OTP.");
      }

      return res.status(200).send("OTP verified successfully.");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to reset password
  async resetPassword(req, res, next) {
    try {
      const userId = req.userId;
      const { email, otp, newPassword } = req.body;
      const user = await this.userRepository.findUser(email, userId);
      if (!user) {
        return res.status(404).send("User not found.");
      }

      const isValid = await this.otpRepository.verifyOtp(user._id, otp);
      if (!isValid) {
        return res.status(400).send("Invalid or expired OTP.");
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await this.userRepository.updatePassword(user._id, hashedPassword);

      return res.status(200).send("Password reset successfully.");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
