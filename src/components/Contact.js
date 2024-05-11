import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css'; // Import CSS file for styling

function Contact() {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: '',
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
  const handleSubmit = async (e) => {
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
    if (formData.fullName === '' || formData.email === '' || formData.phoneNumber === '' || formData.text === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send form data to server
      const response = await axios.post('https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/contact/contact_us_request', formData);

      // Handle success
      console.log('Form data sent successfully:', response.data);

      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        confirmEmail: '',
        phoneNumber: '',
        text: ''
      });

      // Optionally show a success message
    } catch (error) {
      // Handle error
      console.error('Error sending form data:', error);
      alert('Failed to send form data');
    }
  };

  return (
    <div>
      <div className="background-img" style={{ backgroundImage: "url('/images/jesus.png')" }}></div>
      <div className="form-container">

        <form onSubmit={handleSubmit}>
          <h2 className='h2t'>CONTACT US</h2>

          <br /><br />
          <input
            placeholder="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
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

export default Contact;
