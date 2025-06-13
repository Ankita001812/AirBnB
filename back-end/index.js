const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(cors());

app.use(cors({
  origin: "http://localhost:3000"
}));



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


const db = client.db("Movies");

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ API endpoints
app.get("/api/data", async (req, res, next) => {
  try {
    const data = await db.collection("Movie").find().toArray();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/api/data", async (req, res, next) => {
  const { mvNumb, mvTitle, yrMade, mvType, Crit, MPAA, Noms, Awrd, dirNumb } =
    req.body;

  if (
    !mvNumb ||
    !mvTitle ||
    !yrMade ||
    !mvType ||
    !Crit ||
    !MPAA ||
    !Noms ||
    !Awrd ||
    !dirNumb
  ) {
    return res.status(400).json({ error: "Please provide all information" });
  }

  if ([mvNumb, yrMade, Crit, Noms, Awrd, dirNumb].some(isNaN)) {
    return res
      .status(400)
      .json({ error: "Some numeric fields are not numbers" });
  }

  try {
    const result = await db.collection("Movie").insertOne({
      mvNumb,
      mvTitle,
      yrMade,
      mvType,
      Crit,
      MPAA,
      Noms,
      Awrd,
      dirNumb,
    });
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    next(error);
  }
});

// //  Serve static React build files
// app.use(express.static(path.join(__dirname, "../front-end/build")));

// //  Catch-all handler AFTER API routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
// });

//  Error handling
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

// ✅ Start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
