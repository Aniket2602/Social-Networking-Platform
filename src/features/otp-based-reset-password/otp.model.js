export default class OTPModel {
  constructor(userId, otp, expiresAt) {
    this.userId = userId;
    this.otp = otp;
    this.expiresAt = expiresAt;
    this.isUsed = false;
  }
}
