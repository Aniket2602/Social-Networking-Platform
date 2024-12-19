import mongoose from "mongoose";
import userSchema from "./user.schema.js";

// Creating Model from UserSchema.
export const UserModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async signUp(newUserData) {
    try {
      const newUser = new UserModel(newUserData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findById(userId) {
    try {
      return await UserModel.findById(userId);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findUser(email, userId) {
    try {
      return await UserModel.findOne({ email, _id: userId });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updatePassword(userId, hashedPassword) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getUserDetails(userId) {
    try {
      return await UserModel.findById(userId, "-password -tokens");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getAllUserDetails() {
    try {
      return await UserModel.find({}, "-password -tokens");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateUserDetails(userId, updateData) {
    try {
      const { name, email, gender, avatar } = updateData;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { name, email, gender, avatar },
        {
          new: true,
          fields: "-password -tokens",
        }
      );
      return updatedUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
