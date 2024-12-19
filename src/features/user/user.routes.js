import express from "express";
import UserController from "./user.controller.js";
import uploadAvatar from "../../middlewares/avatarUpload.middleware.js";
import jwtAuthentication from "../../middlewares/jwt.middleware.js";

const userRouter = express.Router();

const userController = new UserController();

// Register a new user account.
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

// Log in as a user.
userRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

// Log out the currently logged-in user.
userRouter.get("/logout", jwtAuthentication, (req, res, next) => {
  userController.logOut(req, res, next);
});

// Log out the user from all devices.
userRouter.get("/logout-all-devices", jwtAuthentication, (req, res, next) => {
  userController.LogOutFromAllDevices(req, res, next);
});

// Retrieve user information.
userRouter.get("/get-details/:userId", jwtAuthentication, (req, res, next) => {
  userController.getUserDetails(req, res, next);
});

// Retrieve information for all users.
userRouter.get("/get-all-details", jwtAuthentication, (req, res, next) => {
  userController.getAllUsers(req, res, next);
});

// Update user details while ensuring that sensitive data like passwords remains secure and undisclosed.
userRouter.put(
  "/update-details/:userId",
  jwtAuthentication,
  uploadAvatar.single("avatar"),
  (req, res, next) => {
    userController.updateUserDetails(req, res, next);
  }
);
export default userRouter;
