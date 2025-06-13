const express = require("express");
const router = express.Router();

module.exports = function (db) {
  // GET all movies
  router.get("/data", async (req, res, next) => {
    try {
      const data = await db.collection("Movie").find().toArray();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  // POST a new movie
  router.post("/data", async (req, res, next) => {
    const {
      mvNumb,
      mvTitle,
      yrMade,
      mvType,
      Crit,
      MPAA,
      Noms,
      Awrd,
      dirNumb,
    } = req.body;

    // Check if all fields are provided
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
      return res
        .status(400)
        .json({ error: "All fields are required. Please fill out everything." });
    }

    // Check numeric fields
    if ([mvNumb, yrMade, Crit, Noms, Awrd, dirNumb].some(isNaN)) {
      return res
        .status(400)
        .json({ error: "One or more numeric fields are not valid numbers." });
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

  return router;
};
