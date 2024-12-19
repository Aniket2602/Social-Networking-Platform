import mongoose from "mongoose";
import postSchema from "./post.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

// Creating Model from PostSchema.
const PostModel = mongoose.model("posts", postSchema);

const { ObjectId } = mongoose.Types;

export default class PostRepository {
  async getAllPosts() {
    try {
      return await PostModel.find();
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getByPostId(postId) {
    try {
      return await PostModel.findOne({ _id: new ObjectId(postId) });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getPostByUser(userId) {
    try {
      return await PostModel.find({ userId: new ObjectId(userId) });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async createPost(newPostData) {
    try {
      const newPost = new PostModel(newPostData);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async deletePost(userId, postId) {
    try {
      const post = await PostModel.findOne({ userId });
      if (post == null) {
        throw new ApplicationError("You can delete your post only.", 400);
      } else {
        await PostModel.deleteOne({ _id: new ObjectId(postId) });
        return await PostModel.find();
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updatePost(userId, postId, caption, imageUrl) {
    try {
      const post = await PostModel.findOne({ userId });
      if (post == null) {
        throw new ApplicationError("You can update your post only.", 400);
      } else {
        // Condition 1
        if (imageUrl == null) {
          const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: new ObjectId(postId) },
            { caption },
            { new: true }
          );
          if (!updatedPost) {
            throw new ApplicationError("Post not found.", 400);
          }
          return updatedPost;
        }
        // Condition 2
        else if (caption == undefined) {
          const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: new ObjectId(postId) },
            { imageUrl },
            { new: true }
          );
          if (!updatedPost) {
            throw new ApplicationError("Post not found.", 400);
          }
          return updatedPost;
        }
        // Condition 3
        else {
          const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: new ObjectId(postId) },
            { caption, imageUrl },
            { new: true }
          );
          if (!updatedPost) {
            throw new ApplicationError("Post not found.", 400);
          }
          return updatedPost;
        }
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
