import express from "express";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();

const likeController = new LikeController();

// Get likes for a specific post or comment.
likeRouter.get("/:Id", (req, res, next) => {
  likeController.getLikesOnPostById(req, res, next);
});

// Toggle like on a post or comment.
likeRouter.get("/toggle/:Id", (req, res, next) => {
  likeController.toggleLikePost(req, res, next);
});

export default likeRouter;
