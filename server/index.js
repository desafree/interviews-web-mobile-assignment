const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PostModel = require("./models/Post");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://desafree:F5uq0CI7UCu7Fcc4@cluster0.bcs0k91.mongodb.net/xtreams?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/posts", (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/posts", (req, res) => {
  const post = new PostModel({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
  });

  post.save((err, doc) => {
    if (err) {
      res.send(err);
    }
    res.send(doc);
  });
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

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
