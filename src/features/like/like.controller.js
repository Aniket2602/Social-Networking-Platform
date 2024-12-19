import LikeRepository from "./like.repository.js";
import LikeModel from "./like.model.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  // Function to get likes for a specific post.
  async getLikesOnPostById(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.Id;
      const likesOnPost = await this.likeRepository.getLikedPostById(
        postId,
        userId
      );
      if (likesOnPost.length > 0) {
        return res.status(200).send(likesOnPost);
      } else {
        return res.status(200).send("Post not found or no likes on this post.");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to toggle like on a post.
  async toggleLikePost(req, res, next) {
    try {
      const postId = req.params.Id;
      const userId = req.userId;
      const isLiked = await this.likeRepository.likedPostByUser(userId, postId);
      if (isLiked.length < 1) {
        const newLikeData = new LikeModel(userId, postId);
        const result = await this.likeRepository.addLike(newLikeData);
        return res
          .status(200)
          .send({ Post: result, message: "Like added to post." });
      } else {
        const result = await this.likeRepository.removeLike(userId, postId);
        return res
          .status(200)
          .send({ Post: result, message: "Like removed from post." });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
