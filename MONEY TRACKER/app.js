const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/moneytracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const transactionRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
