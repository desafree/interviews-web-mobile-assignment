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

app.get("/posts", async (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
