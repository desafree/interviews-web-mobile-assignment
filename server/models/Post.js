const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
