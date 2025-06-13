import React, { useState } from 'react';
import '../style/style.css'; // Make sure style.css is in the same directory or adjust the path

function MyForm() {
  const [formData, setFormData] = useState({
    id: '',
    thing: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData({
      id: '',
      thing: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Item submitted successfully!');
        handleReset(); // Clear the form
      } else {
        alert('Failed to submit item.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div>
      <header>
        <h1>A Database</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Item</h3>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <br /><br />
          <label htmlFor="thing">Thing</label>
          <input
            type="text"
            id="thing"
            name="thing"
            value={formData.thing}
            onChange={handleChange}
            required
          />
          <br /><br />
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default MyForm;
