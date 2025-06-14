const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;

// Initialize MongoClient
const client = new MongoClient(mongoUri);

// Connect MongoClient
async function connectMongoClient() {
  try {
    await client.connect();
    console.log("Connected to MongoDB with MongoClient");
  } catch (error) {
    console.error("Failed to connect MongoClient", error);
  }
}

// Connect Mongoose
async function connectMongoose() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("Failed to connect Mongoose", error);
  }
}

async function startServer() {
  await Promise.all([connectMongoClient(), connectMongoose()]);

  // Example: passing MongoClient's db to your route that uses native driver
  const db = client.db("sample_airbnb");
  const listingRoutes = require("./routes/listingRoute")(db);
  app.use("/api", listingRoutes);

  // Booking route uses Mongoose models
  const bookingsRoute = require("./routes/bookings")(db);
  app.use("/api", bookingsRoute);

  // 404 and error handlers
  app.use((req, res) => {
    res.status(404).send("Not found");
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
  });

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
