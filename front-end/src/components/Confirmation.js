import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Confirmation.css"; 

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    // No booking data, redirect to booking page
    navigate("/");
    return null;
  }

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      {/* {/* <p><strong>Booking ID:</strong> {booking._id}</p> */}
      <p><strong>Listing ID:</strong> {booking.listingId}</p>
      <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
      <p><strong>Client Name:</strong> {booking.clientName}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Mobile Phone:</strong> {booking.mobilePhone || "N/A"}</p>
      <p><strong>Postal Address:</strong> {booking.postalAddress || "N/A"}</p>
      <p><strong>Home Address:</strong> {booking.homeAddress || "N/A"}</p>
      {/* <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p> */}

      <button onClick={() => navigate("/")}>Thank you!</button>
    </div>
  );
}

export default Confirmation;
