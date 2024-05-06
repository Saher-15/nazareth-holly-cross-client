import "../styles/Candle.css";
import React, { useState } from "react";
import { Button } from './Button';
import axios from "axios";


function Candle() {
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
    <div className="candle">
      <div className="blur-background"></div> {/* Add a div for the blurred background */}

      <div className="leftSide">
        <p className="prayer-message">Feel free to share your prayer with us<br /> and we'll light a candle for you at Jesus City Church.
          <br /><br />Once done<br /> we'll send you a video confirmation to your email address.</p>
      </div>

      <div className="rightSide">

        <h1> LIGHT A PRAY CANDLE</h1>

        <div>
          <form className="candle-form center-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <div className="name-container">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={form.firstname}
                  onChange={handleChangeForm}
                  required
                  className="form-control"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={form.lastname}
                  onChange={handleChangeForm}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChangeForm}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="confirmEmail"
                placeholder="Confirm Email"
                value={form.confirmEmail}
                onChange={handleChangeForm}
                required
                className="form-control"
              />
              {emailMatchError && <p className="error-message">{emailMatchError}</p>}
            </div>
            <div className="form-group">
              <textarea
                name="pray"
                placeholder="Your Prayer"
                value={form.pray}
                onChange={handleChangeForm}
                required
                className="form-control"
              ></textarea>
              {inputWarning && <p className="error-message">{inputWarning}</p>}
            </div>
            <h5>to light a candle you have to pay 1$</h5>
            <div className='hero-btns'>
              <Button
                className='btns'
                onClick={handleLightButton}
                buttonStyle='btn--outline'
                buttonSize='btn--medium'
                type="button"
              >
                LIGHT
              </Button>
              {lightButtonClicked && <p>Note: Your candle has been lit!</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Candle;