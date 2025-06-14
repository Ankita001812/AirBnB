import React, { useState } from "react";
import "../style/Booking.css";
import { useNavigate, useLocation } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listingId = searchParams.get("listing_id");

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    clientName: "",
    email: "",
    mobilePhone: "",
    postalAddress: "",
    homeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const listingId = searchParams.get("listing_id");
    if (!listingId) {
      alert("No listing selected for booking.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, listingId }),
      });

      console.log("Response:", response);

      if (response.ok) {
        alert("Booking submitted successfully!");

        setFormData({
          startDate: "",
          endDate: "",
          clientName: "",
          email: "",
          mobilePhone: "",
          postalAddress: "",
          homeAddress: "",
        });

        navigate("/");
      } else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      alert("Error submitting booking");
      console.error(error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Stay</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div>
          <label>Check-In Date: *</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Check-Out Date: *</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Your Information</h2>

        <div>
          <label>Full Name: *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />
        </div>

        <div>
          <label>Email Address: *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@example.com"
          />
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            placeholder="e.g. +61 555 654321"
          />
        </div>

        <div>
          <label>Postal Address:</label>
          <textarea
            name="postalAddress"
            value={formData.postalAddress}
            onChange={handleChange}
            rows={2}
            placeholder="Postal Address"
          />
        </div>

        <div>
          <label>Home Address:</label>
          <textarea
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            rows={2}
            placeholder="Home Address"
          />
        </div>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
