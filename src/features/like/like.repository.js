import mongoose from "mongoose";
import likeSchema from "./like.schema.js";

const LikeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
  async getLikedPostById(postId, userId) {
    try {
      return await LikeModel.find({ postId }).populate("userId","_id name email gender");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async likedPostByUser(userId, postId) {
    try {
      const likedPostByUser = await LikeModel.find({ userId, postId });
      return likedPostByUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async addLike(newLikeData) {
    try {
      const newLike = new LikeModel(newLikeData);
      await newLike.save();
      const { userId, postId } = newLikeData;
      return await LikeModel.find({ userId, postId });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async removeLike(userId, postId) {
    try {
      const likedPostByUser = await LikeModel.find({ userId, postId });
      await LikeModel.deleteOne({ userId, postId });
      return likedPostByUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
