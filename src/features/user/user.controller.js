import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";
import UserModel from "./user.model.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Sign-Up function (Registration of User)
  async signUp(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      // creating hashed password.
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUserData = new UserModel(name, email, hashedPassword, gender);
      const result = await this.userRepository.signUp(newUserData);
      return res.status(201).send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Sign-In function
  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentails.");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          user.tokens.push(token);
          await user.save();
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentails.");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // log-Out function
  async logOut(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await this.userRepository.findById(req.userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).send("User not found.");
      }

      // Ensure user has tokens
      if (!user.tokens || !user.tokens.includes(token)) {
        return res.status(400).send("Token not found or already logged out.");
      }

      // Remove token from user's active tokens
      user.tokens = user.tokens.filter((t) => t !== token);
      await user.save();

      return res.status(200).send("Logged out successfully.");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // log-Out from all devices function
  async LogOutFromAllDevices(req, res, next) {
    try {
      const user = await this.userRepository.findById(req.userId);
      // Ensure user has tokens
      if (!user.tokens || user.tokens.length === 0) {
        return res.status(400).send("No active sessions to log out from.");
      }

      // Clear all tokens from user's active tokens
      user.tokens = [];
      await user.save();
      return res.status(200).send("Logged out from all devices.");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Retrieve user details
  async getUserDetails(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getUserDetails(userId);
      if (!user) {
        return res.status(404).send("User not found.");
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Retrieve all user details
  async getAllUsers(req, res, next) {
    try {
      const users = await this.userRepository.getAllUserDetails();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Update user details (including avatar)
  async updateUserDetails(req, res, next) {
    try {
      const userId = req.params.userId;
      const updateData = req.body;

      // Handle avatar upload
      if (req.file) {
        updateData.avatar = req.file.filename;
      }

      if (req.userId != userId) {
        return res.status(404).send("You can change only your details.");
      }

      const updatedUser = await this.userRepository.updateUserDetails(
        userId,
        updateData
      );

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
