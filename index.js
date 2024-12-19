import "./env.js";
import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import connectUsingMongoose from "./src/configuration/mongoose.Configuration.js";
import jwtAuthentication from "./src/middlewares/jwt.middleware.js";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendshipRouter from "./src/features/friendship/friendship.routes.js";
import optRouter from "./src/features/otp-based-reset-password/otp.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import apiDoc from "./swagger.json" assert { type: "json" };

const server = express();

server.use(bodyParser.json());

server.use(loggerMiddleware);

server.use("/api-docs", swagger.serve, swagger.setup(apiDoc));

// Redirecting to user router for all request related to users.
server.use("/api/users", userRouter);

// Redirecting to post router for all request related to posts.
server.use("/api/posts", jwtAuthentication, postRouter);

// Redirecting to comment router for all request related to comments.
server.use("/api/comments", jwtAuthentication, commentRouter);

// Redirecting to like router for all request related to likes.
server.use("/api/likes", jwtAuthentication, likeRouter);

// Redirecting to friendship router for all request related to friendship.
server.use("/api/friends", jwtAuthentication, friendshipRouter);

// Redirecting to otp router for all request related to otp.
server.use("/api/otp", jwtAuthentication, optRouter);

server.get("/", (req, res) => {
  res.send("Welcome to social networking platform 2.");
});

// Error Handling Middleware
server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send("Something went wrong, please try again later.");
  }
});

// Middleware to handle 404 requests.
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:2500/api-docs"
    );
});

server.listen(2500, () => {
  console.log("Server is running at 2500.");
  connectUsingMongoose();
});
