import mongoose from "mongoose";
import commentSchema from "./comment.schema.js";

const CommentModel = mongoose.model("comments", commentSchema);

export default class CommentRepository {
  async getAllComments(postId) {
    try {
      return await CommentModel.find({ postId });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async createComment(newCommentData) {
    try {
      const newComment = new CommentModel(newCommentData);
      await newComment.save();
      return newComment;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async deleteComment(userId, commentId) {
    try {
      const result = await CommentModel.deleteOne({
        _id: commentId,
        userId: userId,
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateComment(userId, commentId, comment) {
    try {
      const updatedComment = await CommentModel.findOneAndUpdate(
        {
          _id: commentId,
          userId: userId,
        },
        { comment: comment },
        { new: true }
      );
      return updatedComment;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
