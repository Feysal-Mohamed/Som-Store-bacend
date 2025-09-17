const express = require("express");
const router = express.Router();
const postController = require("../controller/postControler"); // adjust path if needed
const upload = require("../middleware/UploadImage"); // adjust path to your multer config

// ---------------- Create Post ----------------
router.post("/create/post", upload.single("image"), postController.createPost);

// ---------------- Get All Posts ----------------
router.get("/read/post", postController.getAllPosts);

// ---------------- Get Single Post ----------------
router.get("/read/post/:postId", postController.getPostById);

// ---------------- Update Post ----------------
router.put("/update/post/:postId", upload.single("image"), postController.updatePost);

// ---------------- Delete Post ----------------
router.delete("/delete/post/:postId", postController.deletePost);

module.exports = router;
