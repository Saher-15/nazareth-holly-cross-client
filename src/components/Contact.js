import React, { useState } from 'react';
import '../styles/Contact.css'; // Import CSS file for styling

function SimpleForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Handler function to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler function to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform validation here
  
    // Example: Check if fields are empty
    if (formData.firstName === '' || formData.lastName === '' || formData.email === '') {
      alert('Please fill in all fields');
      return;
    }
  
    // Process the form data
    console.log("First Name: " + formData.firstName + ", Last Name: " + formData.lastName + ", Email: " + formData.email);
  
    // You can also send the data to a server using fetch or Axios
  
    // Reset the form
    setFormData({
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  return (
    <div>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <div className="name-field">
            <label htmlFor="firstName">First Name:</label><br />
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div className="name-field">
            <label htmlFor="lastName">Last Name:</label><br />
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <label htmlFor="email">Email:</label><br />
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SimpleForm;
