import CommentRepository from "./comment.repository.js";
import CommentModel from "./comment.model.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  // Function to get comments for a specific post.
  async getCommentsOnPost(req, res, next) {
    try {
      const postId = req.params.postId;
      const allCommentsOnPost = await this.commentRepository.getAllComments(
        postId
      );
      return res.status(200).send(allCommentsOnPost);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to add a comment to a specific post.
  async createCommentOnPost(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const { comment } = req.body;
      if (!comment || comment.length < 1) {
        return res.status(400).send("Comment cannot be empty.");
      }
      const newCommentData = new CommentModel(userId, postId, comment);
      const commentCreated = await this.commentRepository.createComment(
        newCommentData
      );
      return res.status(201).send(commentCreated);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to delete a specific comment.
  async deleteCommentOnPost(req, res, next) {
    try {
      const userId = req.userId;
      const commentId = req.params.commentId;
      const result = await this.commentRepository.deleteComment(
        userId,
        commentId
      );
      if (!result) {
        return res.status(404).send("Comment not found.");
      } else {
        return res.status(200).send("Comment deleted.");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to update a specific comment.
  async updateCommentOnPost(req, res, next) {
    try {
      const userId = req.userId;
      const commentId = req.params.commentId;
      const { comment } = req.body;
      if (!comment || comment.length < 1) {
        return res.status(400).send("Comment cannot be empty.");
      }
      const result = await this.commentRepository.updateComment(
        userId,
        commentId,
        comment
      );
      if (!result) {
        return res.status(404).send("Comment not found.");
      } else {
        return res.status(200).send("Comment updated.");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
