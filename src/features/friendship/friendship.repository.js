import mongoose from "mongoose";
import friendshipSchema from "./friendship.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

const FriendshipModel = mongoose.model("friends", friendshipSchema);

export default class FriendshipRepository {
  async getFriendsByUserId(userId) {
    try {
      return await FriendshipModel.find({
        userId,
        status: "accepted",
      }).populate("friendId", "name email");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getPendingRequests(userId) {
    try {
      return await FriendshipModel.find({
        friendId: userId,
        status: "pending",
      }).populate("userId", "name email");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async toggleFriendship(userId, friendId) {
    try {
      const friendship = await FriendshipModel.findOne({ userId, friendId });
      if (friendship) {
        await FriendshipModel.deleteOne({ _id: friendship._id });
        return null;
      } else {
        const newFriendship = new FriendshipModel({ userId, friendId });
        return await newFriendship.save();
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async responseToRequest(userId, friendId, response) {
    try {
      const friendship = await FriendshipModel.findOne({
        friendId: userId,
        userId: friendId,
        status: "pending",
      });
      if (!friendship) {
        throw new ApplicationError("No pending request found.", 400);
      }
      friendship.status = response == "accept" ? "accepted" : "rejected";
      return await friendship.save();
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
