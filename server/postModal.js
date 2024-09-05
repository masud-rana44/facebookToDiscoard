const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

postSchema.statics.isNewPost = async function (postId) {
  const existingPost = await this.findOne({ postId });
  return !existingPost;
};

module.exports = mongoose.model("Post", postSchema);
