import mongoose from "mongoose";
import otpSchema from "./otp.schema.js";
import bcrypt from "bcrypt";

const OTPModel = mongoose.model("otps", otpSchema);

export default class OTPRepository {
  // Create an OTP and save it
  async createOtp(userId, otp) {
    try {
      const hashedOtp = await bcrypt.hash(otp, 10); // Hash OTP before saving
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
      const otpInstance = new OTPModel({ userId, otp: hashedOtp, expiresAt });
      await otpInstance.save();
      return otpInstance;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Get OTP for a specific user and verify
  async verifyOtp(userId, otp) {
    try {
      const otpInstance = await OTPModel.findOne({ userId, isUsed: false });
      if (!otpInstance || otpInstance.expiresAt < Date.now()) {
        return false; // OTP expired or does not exist
      }
      const isValid = await bcrypt.compare(otp, otpInstance.otp);
      if (!isValid) {
        return false;
      }
      otpInstance.isUsed = true; // Mark OTP as used after verification
      await otpInstance.save();
      return true;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Remove old OTPs for a user
  async removeOldOtps(userId) {
    try {
      await OTPModel.deleteMany({ userId, isUsed: false });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  
}
