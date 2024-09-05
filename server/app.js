const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const dbUrl = `mongodb+srv://admin:test1234@cluster0.egfjetc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("🔥🔥 ERROR: ", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
