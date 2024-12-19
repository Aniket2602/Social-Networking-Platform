import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

const commentController = new CommentController();

// Get comments for a specific post.
commentRouter.get("/:postId", (req, res, next) => {
  commentController.getCommentsOnPost(req, res, next);
});

// Add a comment to a specific post.
commentRouter.post("/:postId", (req, res, next) => {
  commentController.createCommentOnPost(req, res, next);
});

// Delete a specific comment.
commentRouter.delete("/:commentId", (req, res, next) => {
  commentController.deleteCommentOnPost(req, res, next);
});

// Update a specific comment.
commentRouter.put("/:commentId", (req, res, next) => {
  commentController.updateCommentOnPost(req, res, next);
});

export default commentRouter;
