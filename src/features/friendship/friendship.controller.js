import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController {
  constructor() {
    this.friendshipRepository = new FriendshipRepository();
  }

  // Function to get a user's friends.
  async getFriends(req, res, next) {
    try {
      const userId = req.params.userId;
      const friends = await this.friendshipRepository.getFriendsByUserId(
        userId
      );
      return res.status(200).send(friends);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to get pending friend requests.
  async getPendingRequest(req, res, next) {
    try {
      const userId = req.userId;
      const pendingRequests =
        await this.friendshipRepository.getPendingRequests(userId);
      return res.status(200).send(pendingRequests);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to toggle friendship with another user.
  async toggleFriendship(req, res, next) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const result = await this.friendshipRepository.toggleFriendship(
        userId,
        friendId
      );
      if (result) {
        return res.status(201).send("Friendship request sent.");
      } else {
        return res.status(200).send("Friendship removed.");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  // Function to accept or reject a friend request.
  async responseToRequest(req, res, next) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const { response } = req.body;
      if (!["accept", "reject"].includes(response)) {
        return res.status(400).send("Invalid Response.");
      }
      const result = await this.friendshipRepository.responseToRequest(
        userId,
        friendId,
        response
      );

      return res.status(200).send(`Friend request ${response}ed.`);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
