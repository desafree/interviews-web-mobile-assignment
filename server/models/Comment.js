const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
