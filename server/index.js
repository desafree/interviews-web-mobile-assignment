const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PostModel = require("./models/Post");
const CommentModel = require("./models/Comment");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://desafree:F5uq0CI7UCu7Fcc4@cluster0.bcs0k91.mongodb.net/xtreams?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});

app.post("/posts", async (req, res) => {
  const post = new PostModel({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
  });

  try {
    const newPost = await post.save();
    res.send(newPost);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete(id);
    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.send(err);
  }
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    var updatedValue = await PostModel.findByIdAndUpdate(
      id,
      { title: req.body.title, body: req.body.body },
      { new: true }
    );
    res.send(updatedValue);
  } catch (error) {
    res.send(err);
  }
});

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.id });
    res.send(comments);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
