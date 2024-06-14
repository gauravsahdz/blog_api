const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Routes
app.use("/api/auth", require("./routes/auth.rt"));
app.use("/api/blogs", require("./routes/blog.rt"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
