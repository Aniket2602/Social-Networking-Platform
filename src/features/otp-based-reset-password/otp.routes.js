import express from "express";
import OTPController from "./otp.controller.js";

const optRouter = express.Router();

const otpController = new OTPController();

// Send OTP
optRouter.post("/send", (req, res, next) => {
  otpController.sendOtp(req, res, next);
});

// Verify OTP
optRouter.post("/verify", (req, res, next) => {
  otpController.verifyOtp(req, res, next);
});

// Reset password
optRouter.post("/reset-password", (req, res, next) => {
  otpController.resetPassword(req, res, next);
});

export default optRouter;
