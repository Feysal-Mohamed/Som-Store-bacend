const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // store image URL or file path
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
