import PostRepository from "./post.repository.js";
import PostModel from "./post.model.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  // Function to retrieve all posts from various users to compile a news feed
  async getAllPost(req, res, next) {
    try {
      const allposts = await this.postRepository.getAllPosts();
      return res.status(200).send(allposts);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to retrieve a specific post by ID.
  async getPostById(req, res, next) {
    try {
      const postId = req.params.postId;
      const post = await this.postRepository.getByPostId(postId);
      return res.status(200).send(post);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to retrieve all posts for a specific user to display on their profile page.
  async getPostByUser(req, res, next) {
    try {
      const userId = req.userId;
      const allPostsOfUser = await this.postRepository.getPostByUser(userId);
      return res.status(200).send(allPostsOfUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to create a new post.
  async createPost(req, res, next) {
    try {
      const userId = req.userId;
      const { caption } = req.body;
      const imageUrl =
        req.file.filename == undefined
          ? "Image is not provided by user."
          : req.file.filename;
      const newPost = new PostModel(userId, caption, imageUrl);
      // const newPost = new PostModel(userId, caption, imageUrl);
      const createdPost = await this.postRepository.createPost(newPost);
      return res.status(201).send(createdPost);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to delete a specific post.
  async deletePost(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const postList = await this.postRepository.deletePost(userId, postId);
      return res.status(200).send(postList);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to update a specific post.
  async updatePost(req, res, next) {
    try {
      const userId = req.userId;
      const postId = req.params.postId;
      const { caption } = req.body;
      const imageUrl = req.file ? req.file.filename : null;
      const updatedPost = await this.postRepository.updatePost(
        userId,
        postId,
        caption,
        imageUrl
      );
      return res.status(200).send(updatedPost);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
