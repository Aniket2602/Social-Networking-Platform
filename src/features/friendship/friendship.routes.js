import express from "express";
import FriendshipController from "./friendship.controller.js";

const friendshipRouter = express.Router();

const friendshipController = new FriendshipController();

// Get a user's friends.
friendshipRouter.get("/get-friends/:userId", (req, res, next) => {
  friendshipController.getFriends(req, res, next);
});

// Get pending friend requests.
friendshipRouter.get("/get-pending-requests", (req, res, next) => {
  friendshipController.getPendingRequest(req, res, next);
});

// Toggle friendship with another user.
friendshipRouter.get("/toggle-friendship/:friendId", (req, res, next) => {
  friendshipController.toggleFriendship(req, res, next);
});

// Accept or reject a friend request.
friendshipRouter.post("/response-to-request/:friendId", (req, res, next) => {
  friendshipController.responseToRequest(req, res, next);
});

export default friendshipRouter;
