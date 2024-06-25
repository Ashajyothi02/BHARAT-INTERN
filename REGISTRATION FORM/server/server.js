const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received data:", { username, email, password });

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser
    .save()
    .then(() => {
      console.log("User registered successfully");
      res.status(200).send("User registered successfully.");
    })
    .catch((err) => {
      console.error("Error saving user:", err.message);
      res.status(500).send("Error registering new user.");
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
