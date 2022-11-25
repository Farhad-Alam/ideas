import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    tags: [String],
    image: {
      public_id: String,
      url: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", PostSchema);
