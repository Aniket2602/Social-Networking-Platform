import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  caption: { type: String, default: "Caption is not provided by the user." },
  imageUrl: { type: String, default: "Image is not provided by the user." },
});

export default postSchema;
