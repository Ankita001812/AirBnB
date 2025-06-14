import React, { useState } from "react";
import "../style/Booking.css"; 

const BookingPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data submitted:", formData);
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
          <label>CHeck-Out Date: *</label>
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
          <label>Full-Name: *</label>
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
