import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import "../styles/Prayer.css";

function Pray() {
    // State to store form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '', // Use email for country in the backend
        phone: '000',
        msg: ''
    });

    // State to store fetched messages
    const [messages, setMessages] = useState([]);

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

    // Function to fetch all submitted messages
    const fetchMessages = async () => {
        try {
            const response = await axios.get('https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/contact/get_all_contact_us');
            
            // Filter messages that are marked as done and reverse order
            const doneMessages = response.data.filter(message => message.done);
            const reversedMessages = doneMessages.reverse();
            setMessages(reversedMessages); // Store reversed messages in state
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Failed to load messages');
        }
    };

    // Handler function to submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting data:", formData);

        if (formData.fullName === '' || formData.email === '' || formData.phone === '' || formData.msg === '') {
            alert('Please fill in all fields');
            return;
        }

        try {
            // Map country field to email field for backend
            const modifiedFormData = { ...formData, email: formData.email };

            // Send form data to server
            await axios.post('https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/contact/contact_us_request', modifiedFormData);

            // Reset form fields
            setFormData({
                fullName: '',
                email: '', // Reset email field
                phone: '000',
                msg: ''
            });

            // Show success message for 3 seconds
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            // Fetch messages after form submission
            fetchMessages();
        } catch (error) {
            console.error('Error sending form data:', error.response ? error.response.data : error.message);
            alert('Failed to send form data');
        }
    };

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);

        // Fetch all messages when the component mounts
        fetchMessages();
    }, []);

    return (
        <div className="pray-container">
            <div className="form-section">
                <form onSubmit={handleSubmit} className="message-form">
                    <label htmlFor="first-name" className="form-title">
                        <h2 className='form-title-text'>Corner for peace</h2>
                    </label>
                    <div className="form-group-pray">
                        <div className="form-input-group">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                autoComplete="given-name"
                                className="form-input"
                            />
                        </div>

                        <div className="form-input-group">
                            <input
                                type="text" // Use text for country
                                name="email"
                                id="country"
                                placeholder="Where are you from?" // Placeholder updated to reflect 'country'
                                value={formData.email} // Still using 'email' as field name
                                onChange={handleChange}
                                required
                                autoComplete="country"
                                className="form-input"
                            />
                        </div>

                        <textarea
                            placeholder="Your pray"
                            id="msg"
                            name="msg"
                            value={formData.msg}
                            onChange={handleChange}
                            required
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-submit-container">
                        <button type="submit" className="form-submit-button">Submit</button>
                    </div>
                    <div className="success-message-container">
                {showMessage && <p className="success-message">Message submitted successfully!</p>}
            </div>
                </form>
            </div>

            {/* Display messages */}
            <div className="messages-section">
                <h3 className="messages-title">Submitted Messages</h3>
                {messages.length > 0 ? (
                    <div className="messages-grid">
                        {messages.map((message, index) => (
                            <div key={index} className="message-item">
                                <p><strong>Name:</strong> {message.fullName}</p>
                                <p><strong>Country:</strong> {message.email}</p> {/* Displaying country as email */}
                                <p><strong>Message:</strong> {message.msg}</p>
                                <hr className="message-divider" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-messages">No messages submitted yet.</p>
                )}
            </div>
        </div>
    );
}

export default Pray;
