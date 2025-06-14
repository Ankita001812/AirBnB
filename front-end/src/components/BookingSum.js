import React, { useEffect, useState } from "react";
import "../style/bookSum.css";

const BookingSum = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/allbookings");
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-summary-container">
      <h2>Booking Summary</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h4> Client Info</h4>
              <h3>{booking.clientName}</h3>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.mobilePhone || "N/A"}</p>
              <p><strong>Check-In:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>Check-Out:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>

              <h4> Property Info</h4>
              <p><strong>Name:</strong> {booking.listingDetails?.name || "N/A"}</p>
              <p><strong>Description:</strong> {booking.listingDetails?.description || booking.listingDetails?.summary || "N/A"}</p>
              <p><strong>Address:</strong> 
                {booking.listingDetails?.address
                  ? `${booking.listingDetails.address.country || ""}`
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingSum;
