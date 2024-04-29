import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css"; 
const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      alert("Message sent successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        address: "",
        email: "",
        phonenumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message. Please try again later.");
    }
  };

  return (
<div className="background-container" style={{ backgroundImage: "url('/images/contactus.jpg')" }}>

      <div className="contact-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="laaddress"
            placeholder="Address"
            value={formData.adress}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>

  );
};

export default ContactUs;
