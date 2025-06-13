import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/add.css";

function AddMovie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mvNumb: "",
    mvTitle: "",
    yrMade: "",
    mvType: "",
    Crit: "",
    MPAA: "",
    Noms: "",
    Awrd: "",
    dirNumb: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "mvNumb",
      "mvTitle",
      "yrMade",
      "mvType",
      "Crit",
      "MPAA",
      "Noms",
      "Awrd",
      "dirNumb",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Required";
      } else if (
        ["mvNumb", "yrMade", "Crit", "Noms", "Awrd", "dirNumb"].includes(
          field
        ) &&
        isNaN(formData[field])
      ) {
        newErrors[field] = "Must be a number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:4001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: "Movie Number", name: "mvNumb" },
          { label: "Title", name: "mvTitle" },
          { label: "Year Made", name: "yrMade" },
          { label: "Type", name: "mvType" },
          { label: "No. of Critics", name: "Crit" },
          { label: "MPAA Rating", name: "MPAA" },
          { label: "Nominations", name: "Noms" },
          { label: "Awards", name: "Awrd" },
          { label: "Director Number", name: "dirNumb" },
        ].map(({ label, name }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input
              type="text"
              className={`form-control ${errors[name] ? "is-invalid" : ""}`}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && (
              <div className="invalid-feedback">{errors[name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
