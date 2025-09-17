const Post = require("../Models/postModel");

// ---------------- Create Post ----------------
const createPost = async (req, res) => {
  try {
    const title = req.body?.title;
    const description = req.body?.description;
    const image = req.file?.filename;
    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = new Post({ title, description, image });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Get All Posts ----------------
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Get Single Post ----------------
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Update Post ----------------
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description } = req.body;
    const image = req.file?.filename; // get new uploaded file if exists

    const updatedData = { title, description };
    if (image) updatedData.image = image; // update image only if new file uploaded

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------------- Delete Post ----------------
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
