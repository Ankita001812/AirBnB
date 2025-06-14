const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listingId: {
    type: String,
    required: true,
    ref: "listingsAndReviews" 
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobilePhone: {
    type: String
  },
  postalAddress: {
    type: String
  },
  homeAddress: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
