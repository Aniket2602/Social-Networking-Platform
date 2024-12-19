export default class CommentModel {
  constructor(userId, postId, comment) {
    this.userId = userId;
    this.postId = postId;
    this.comment = comment;
  }
}
