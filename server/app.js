const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const facebookService = require("./facebookService");
// const discordService = require("./discordService");
const Post = require("./postModal");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.egfjetc.mongodb.net/facebook_discord_bot?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("🔥🔥 ERROR: ", err));

// ROUTES

// Get all facebook groups
app.get("/api/groups", async (req, res) => {
  try {
    const groups = await Post.find().distinct("groupId");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new Facebook group
app.post("/api/groups", async (req, res) => {
  const { groupId } = req.body;

  if (!groupId) return res.status(400).send("Group ID is required");

  try {
    const post = new Post({ groupId });
    await post.save();
    res.json(post);
  } catch (err) {
    // console.error("Error saving post: ", err);
    res.status(500).send("Server error");
  }
});

// Remove a Facebook group
app.delete("/api/groups/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    await Post.deleteMany({ groupId });
    res.json({ msg: "Group removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get bot status
app.get("/api/bot/status", (req, res) => {
  res.json({ status: "Bot is running" });
});

// Get bot logs
app.get("/api/bot/logs", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(10);
    const logs = posts.map(
      (post) => `Post "${post.message}" sent to Discord at ${post.date}`
    );
    res.json(logs);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Start pulling facebook and send to discord (every 60s)
setInterval(async () => {
  const groups = await Post.find().distinct("groupId");
  for (const groupId of groups) {
    const posts = await facebookService.getFacebookPosts(groupId);
    for (const post of posts) {
      if (await Post.isNewPost(post.id)) {
        // await discordService.sendToDiscordChannel("channel-id", post.message);
        // await Post.create({ groupId, postId: post.id, message: post.message });
      }
    }
  }
}, 6000);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
