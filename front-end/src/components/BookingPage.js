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

  const [errors, setErrors] = useState({});

  
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

    // Check-in date (startDate) validation
    if (!formData.startDate) {
      newErrors.startDate = "Check-in date is required.";
    } else if (formData.startDate <= today) {
      newErrors.startDate = "Check-in date must be after today.";
    }

    // Check-out date (endDate) validation
    if (!formData.endDate) {
      newErrors.endDate = "Check-out date is required.";
    } else if (formData.startDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = "Check-out must be after check-in date.";
    }

    // Full Name validation
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Full name is required.";
    } else if (!nameRegex.test(formData.clientName)) {
      newErrors.clientName = "Name can only contain letters, spaces, apostrophes, and hyphens.";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Mobile number validation (optional)
    if (formData.mobilePhone && !phoneRegex.test(formData.mobilePhone)) {
      newErrors.mobilePhone = "Enter a valid mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listingId) {
      alert("No listing selected for booking.");
      return;
    }

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:4001/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, listingId }),
      });

      if (response.ok) {
        const booking = await response.json();
        alert("🎉 Booking submitted successfully!");
        navigate("/confirmation", { state: { booking } });

        setFormData({
          startDate: "",
          endDate: "",
          clientName: "",
          email: "",
          mobilePhone: "",
          postalAddress: "",
          homeAddress: "",
        });
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
            min={today}
            required
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </div>

        <div>
          <label>Check-Out Date: *</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={today}
            required
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
        </div>

        <h2>Your Information</h2>

        <div>
          <label>Full Name: *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          {errors.clientName && <p className="error">{errors.clientName}</p>}
        </div>

        <div>
          <label>Email Address: *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.mobilePhone && <p className="error">{errors.mobilePhone}</p>}
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
