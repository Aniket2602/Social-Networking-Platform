import express from "express";
import PostController from "./post.controller.js";
import uploadPost from "../../middlewares/postUpload.middleware.js";

const postRouter = express.Router();

const postController = new PostController();

// Retrieve all posts from various users to compile a news feed
postRouter.get("/all", (req, res, next) => {
  postController.getAllPost(req, res, next);
});

// Retrieve a specific post by ID.
postRouter.get("/:postId", (req, res, next) => {
  postController.getPostById(req, res, next);
});

// Retrieve all posts for a specific user to display on their profile page.
postRouter.get("/", (req, res, next) => {
  postController.getPostByUser(req, res, next);
});

// Create a new post.
postRouter.post("/", uploadPost.single("imageUrl"), (req, res, next) => {
  postController.createPost(req, res, next);
});

// Delete a specific post.
postRouter.delete("/:postId", (req, res, next) => {
  postController.deletePost(req, res, next);
});

// Update a specific post.
postRouter.put("/:postId", uploadPost.single("imageUrl"), (req, res, next) => {
  postController.updatePost(req, res, next);
});

export default postRouter;
