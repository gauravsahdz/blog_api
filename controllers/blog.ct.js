const Blog = require("../models/blog.mo");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 200,
      data: blogs,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.status(200).json({
      status: 200,
      data: blog,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.createBlog = async (req, res) => {
  const { title, body, author } = req.body;

  try {
    const newBlog = new Blog({
      title,
      body,
      author,
      authorId: req.user.id,
    });

    const blog = await newBlog.save();
    res.status(201).json({
      status: 201,
      message: "Blog created",
      data: blog,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateBlog = async (req, res) => {
  const { title, body, author } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    // Check user
    if (blog.authorId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: { title, body, author } },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Blog updated",
      data: blog,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    console.log("deleting", blog);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Check user
    if (!req.user || blog.authorId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Blog removed" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
