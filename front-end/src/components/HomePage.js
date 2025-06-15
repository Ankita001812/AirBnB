import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/HomePage.css";

const HomePage = () => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    price: "",
  });

  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all listings on initial load (no filters)
    fetchListings();
  }, []);

  const fetchListings = async (filtersToUse = null) => {
    let url = "http://localhost:4001/api/listings";

    // Only add query params if filters are provided (i.e., after clicking Search)
    if (filtersToUse) {
      const query = new URLSearchParams(filtersToUse).toString();
      url += `?${query}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!filters.location.trim()) {
      setError("Location is required.");
      return;
    }

    setError("");
    fetchListings(filters);
  };

  const goToBooking = (listingId) => {
    navigate(`/booking?listing_id=${listingId}`);
  };

  return (
    <div className="container">
      <h2>Airbnb Property Finder</h2>

      {/* Filter Form */}
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            required
            placeholder="e.g. Barcelona"
          />
        </div>

        <div className="form-group">
          <label>Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condominium">Condominium</option>
            <option value="Loft">Loft</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bedrooms</label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price Range</label>
          <select name="price" onChange={handleChange} value={filters.price}>
            <option value="">Any</option>
            <option value="50">$50 and below</option>
            <option value="100">$50 - $100</option>
            <option value="200">$100 - $200</option>
            <option value="300">$200 - $300</option>
            <option value="500">$300 - $500</option>
            <option value="1000">$500 and above</option>
          </select>
        </div>
      

        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Listings */}
      <div className="listing-section">
        <h2>
          {listings.length > 0
            ? `${listings.length} Listings that match your preferences`
            : "No listings found."}
        </h2>

        <h4>Click on a listing to book your stay!</h4>

        {listings.length > 0 && (
          <div className="listing-grid">
            {listings.map((listing) => (
              <Link
                    to={`/booking?listing_id=${
                      listing.listing_id || listing._id
                    }`}
                  >
              <div
                key={listing.listing_id || listing._id}
                className="listing-card"
              >

                <h4
                  className="listing-title"
                  onClick={() => goToBooking(listing.listing_id || listing._id)}
                >
                  <Link
                    to={`/booking?listing_id=${
                      listing.listing_id || listing._id
                    }`}
                  >
                    {listing.name}
                  </Link>
                </h4>
                <p>{listing.summary || "No summary available."}</p>
                <p>
                  <strong>Daily Rate:</strong>{" "}
                  {listing.price?.$numberDecimal
                    ? `$${listing.price.$numberDecimal}`
                    : listing.price
                    ? `$${listing.price}`
                    : "N/A"}{" "}
                  per night
                </p>
                <p>
                  <strong>Customer Rating:</strong>{" "}
                  {listing.review_score?.$numberDecimal ||
                    listing.review_score ||
                    "Not rated"}
                </p>
              </div>
            
              </Link>))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
