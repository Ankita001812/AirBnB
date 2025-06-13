const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
// import movieRoute from "./routes/movieRoute";

const cors = require("cors");
const app = express();

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// const uri =
//   "mongodb+srv://s3980223:Dream@123@a4-3980223-cluster.mtdfcqs.mongodb.net/";
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
console.log("Mongo URI:", process.env.MONGO_URI);

// const db = client.db("Movies");
const db = client.db("sample_airbnb");

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes with DB
// const movieRoutes = require("./routes/movieRoute")(db);
// app.use("/api", movieRoutes);

const movieRoutes = require("./routes/listingRoute")(db);
app.use("/api", movieRoutes);

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

// Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
