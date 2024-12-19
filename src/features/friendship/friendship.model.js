export default class FriendshipModel {
  constructor(userId, friendId, status = "pending") {
    this.userId = userId;
    this.friendId = friendId;
    this.status = status;
  }
}
