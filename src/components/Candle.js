import "../styles/Candle.css";
import React, { useState } from "react";
import { Button } from './Button';
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";


function Contact() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    pray: ""
  });

  const [lightButtonClicked, setLightButtonClicked] = useState(false);
  const [emailMatchError, setEmailMatchError] = useState("");
  const [inputWarning, setInputWarning] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLightButton = async () => {
    // Check if any input fields are empty
    if (!form.firstname || !form.lastname || !form.email || !form.confirmEmail || !form.pray) {
      setInputWarning("Please fill out all fields");
      setTimeout(() => {
        setInputWarning(""); // Clear the warning message after 2 seconds
      }, 2000);
      return;
    }

    // Check if both email inputs match
    if (form.email !== form.confirmEmail) {
      setEmailMatchError("Emails do not match");
      return;
    }

    // Call the light a candle API
    const { firstname, lastname, email, pray } = form;
    try {
      await axios.post('https://nazareth-holly-city-server-8b53453baac6.herokuapp.com/candle/lightACandle', { firstName: firstname, lastName: lastname, email, pray });
      setLightButtonClicked(true);
    } catch (error) {
      console.error("Error lighting a candle:", error);
    }
  };

  return (
    <div className="contact">
      <div className="leftSide">
      
        <p className="prayer-message">Feel free to share your prayer with us, and we'll light a candle for you at Jesus City Church.
          <br /><br />Once done, we'll send you a video confirmation to your email address.<h6><br/><br/><br/><br/><br/>to light a candle you have to pay 1$</h6></p>      
      </div>

      <div className="rightSide">
        <video autoPlay loop muted className="video-bg">
          <source src="/videos/video-5.mp4" type="video/mp4" />
        </video>
        <h1> LIGHT A PRAY CANDLE</h1>

        <Container>

          <Row className="sec_sp">

            <Col lg="6">

              <form className="contact-form center-form" onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col lg="6" className="form-group">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={form.firstname}
                      onChange={handleChangeForm}
                      required
                    />
                  </Col>
                  <Col lg="6" className="form-group">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={form.lastname}
                      onChange={handleChangeForm}
                      required
                    />
                  </Col>
                  <Col lg="12" className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChangeForm}
                      required
                    />
                  </Col>
                  <Col lg="12" className="form-group">
                    <input
                      type="email"
                      name="confirmEmail"
                      placeholder="Confirm Email"
                      value={form.confirmEmail}
                      onChange={handleChangeForm}
                      required
                    />
                    {emailMatchError && <p>{emailMatchError}</p>}
                  </Col>
                  <Col lg="12" className="form-group">
                    <textarea
                      name="pray"
                      placeholder="Your Pray"
                      value={form.pray}
                      onChange={handleChangeForm}
                      required
                    ></textarea>
                  </Col>
                  <Col lg="12" className="form-group">
                    {inputWarning && <p>{inputWarning}</p>}
                  </Col>
                </Row>
                <div className='hero-btns'>

                  <Col lg="12" className="form-group">

                    <Button
                      className='btns'
                      onClick={handleLightButton}
                      buttonStyle='btn--outline'
                      buttonSize='btn--medium'
                      type="button"
                    >
                      LIGHT
                    </Button>

                  </Col>

                  {/* Display confirmation message if the light button was clicked */}
                  {lightButtonClicked && <p>Note: Your candle has been lit!</p>}
                </div>
              </form>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Contact;