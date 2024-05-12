import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Candle.css";

function Candle() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    pray: ""
  });

  const navigate = useNavigate();

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
      setTimeout(() => {
        setInputWarning(""); // Clear the warning message after 2 seconds
      }, 2000);
      return;
    }

    // Check if both email inputs match
    if (form.email !== form.confirmEmail) {
      setEmailMatchError("Emails do not match");
      setTimeout(() => {
        setEmailMatchError(""); // Clear the error message after 2 seconds
      }, 2000);
      return;
    }

    try {
      navigate("/checkoutcandle", { state: { form: form } });
    } catch (error) {
      console.error("Error lighting a candle:", error);
    }
  };

  return (
    <div className="candle">
      <div className="blur-background"></div> {/* Add a div for the blurred background */}

      <div className="leftSide">
        <p className="prayer-message">Light a candle in a Nazareth church <br /> send us your wish or prayer and we will light a candle for you, keeping the ancient tradition alive.<br /><br /><h5>to light a candle you have to pay 2$</h5></p>


      </div>

      <div className="rightSide">
        <p className="prayer-message">Personal prayer and candle lighting</p>

        {/* <h1> LIGHT A PRAY CANDLE</h1> */}
        <div className="candle-card">

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
              <div className='hero-btns-candle'>
                <button onClick={handleLightButton}>LIGHT</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Candle;
