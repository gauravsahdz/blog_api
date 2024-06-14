const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/auth.ct");
const authMiddleware = require("../middlewares/auth.mw");

// @route GET /api/auth
// @desc Get user by token
// @access Private
router.get("/", authMiddleware, getUser);

// @route POST /api/register
// @desc Register a new user
// @access Public
router.post("/register", register);

// @route POST /api/login
// @desc Login user and get token
// @access Public
router.post("/login", login);

module.exports = router;
