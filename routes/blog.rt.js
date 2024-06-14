const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.mw");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.ct");

// @route POST /api/posts
// @desc Create a new post
// @access Private
router.post("/", authMiddleware, createBlog);

// @route GET /api/posts
// @desc Get all posts
// @access Public
router.get("/", getAllBlogs);

// @route GET /api/posts/:id
// @desc Get post by ID
// @access Public
router.get("/:id", getBlog);

// @route PUT /api/posts/:id
// @desc Update a post
// @access Private
router.patch("/:id", authMiddleware, updateBlog);

// @route DELETE /api/posts/:id
// @desc Delete a post
// @access Private
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
