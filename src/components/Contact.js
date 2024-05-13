import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css'; // Import CSS file for styling

function Contact() {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    msg: ''
  });

  // State to manage the visibility of the message
  const [showMessage, setShowMessage] = useState(false);

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

    if (formData.fullName === '' || formData.email === '' || formData.phone === '' || formData.msg === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      console.log(formData);
      // Send form data to server
      const response = await axios.post('https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/contact/contact_us_request', formData);

      // Handle success
      console.log('Form data sent successfully:', response.data);

      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        msg: ''
      });

      // Show success message for 2 seconds
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
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
            placeholder="Phone Number"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          /><br /><br />
          <textarea
            placeholder="Text"
            id="msg"
            name="msg"
            value={formData.msg}
            onChange={handleChange}
          /><br /><br />
          <button type="submit">Submit</button>
        </form>
        {showMessage && <p style={{color: "#fff"}}>Message submitted successfully!</p>}
      </div>
    </div>
  );
}

export default Contact;
