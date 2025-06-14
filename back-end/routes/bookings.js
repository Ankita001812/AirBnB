const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

module.exports = function (db) {
  // POST: Create a new booking using Mongoose
  router.post("/booking", async (req, res) => {
    try {
      const booking = new Booking(req.body);
      const savedBooking = await booking.save();
      res.status(201).json(savedBooking);
      console.log("Booking created successfully:", savedBooking);
    } catch (err) {
      console.error("Booking creation error:", err);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // GET: All bookings with listing info using native MongoDB
  router.get("/allbookings", async (req, res, next) => {
    try {
      const bookingsWithListings = await db
        .collection("bookings")
        .aggregate([
          {
            $lookup: {
              from: "listingsAndReviews",
              localField: "listingId",
              foreignField: "_id",
              as: "listingDetails",
            },
          },
          {
            $unwind: {
              path: "$listingDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              clientName: 1,
              email: 1,
              mobilePhone: 1,
              startDate: 1,
              endDate: 1,
              createdAt: 1,
              "listingDetails.name": 1,
              "listingDetails.summary": 1,
              "listingDetails.address.country": 1,
              "listingDetails.address.market": 1,
              "listingDetails.address.street": 1,
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray();

      res.json(bookingsWithListings);
    } catch (error) {
      console.error("Error fetching bookings with listings:", error);
      next(error);
    }
  });

  return router;
};
