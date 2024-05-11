import React, { useState } from 'react';
import '../styles/Contact.css'; // Import CSS file for styling

function SimpleForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phoneNumber: '',
    text: ''
  });

  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

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

    // Check if emails match
    if (formData.email !== formData.confirmEmail) {
      setErrorMessage('Emails do not match');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    // You can perform validation here
    // Example: Check if fields are empty
    if (formData.firstName === '' || formData.lastName === '' || formData.email === '') {
      alert('Please fill in all fields');
      return;
    }

    // Process the form data

    // You can also send the data to a server using fetch or Axios

    // Reset the form
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      text: ''
    });
  };

  return (
    <div >
      <div className="background-img" style={{ backgroundImage: "url('/images/jesus.png')" }}></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <br /><br />
          <input
            placeholder="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <br /><br />
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          /><br /><br />
          <input
            placeholder="Confirm Email"
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
          /><br /><br />
          <input
            placeholder="Phone Number"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          /><br /><br />
          <textarea
            placeholder="Text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
          /><br /><br />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SimpleForm;
