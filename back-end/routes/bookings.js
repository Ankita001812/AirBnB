const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST: Create a new booking
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


router.get("/allbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
