import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Candle.css';

function Candle() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    pray: ""
  });

  const [selectedChurch, setSelectedChurch] = useState(""); // State for selected church
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

  const handleChurchSelection = (e) => {
    setSelectedChurch(e.target.value); // Update selected church state
  };

  const handleLightButton = async () => {
    // Check if any input fields are empty
    if (!form.firstname || !form.lastname || !form.email || !form.confirmEmail || !form.pray || !selectedChurch) {
      setInputWarning("Please  select a church.");
      setTimeout(() => {
        setInputWarning(""); // Clear the warning message after 2 seconds
      }, 2000);
      return;
    }

    // Check if both email inputs match
    if (form.email !== form.confirmEmail) {
      setEmailMatchError("Emails don't match");
      setTimeout(() => {
        setEmailMatchError(""); // Clear the error message after 2 seconds
      }, 2000);
      return;
    }

    try {
      // Append selected church to the prayer
      const updatedPray = `${selectedChurch}, ${form.pray}`;
      setForm((prevForm) => ({ ...prevForm, pray: updatedPray }));

      // Navigate to PayPal component with form data
      navigate("/checkoutcandle", { state: { form: { ...form, pray: updatedPray } } });
    } catch (error) {
      console.error("Error lighting a candle:");
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="candle">
      <div className="leftSide">
        <p className="prayer-message">
          Light a candle in a Nazareth church and share your wish or prayer with us.<br />
          We'll keep the tradition alive by lighting a candle for you and send a video confirmation to your email.
        </p>
        <div className="video-container">
          <video controls poster="/images/logo.webp">
            <source
              src="https://firebasestorage.googleapis.com/v0/b/nazareth-holy-cross.appspot.com/o/videos%2FWhatsApp%20Video%202024-09-12%20at%2011.57.40_4a6da68a.mp4?alt=media&token=ab7e16da-d452-41ec-a5b9-fafd2ca97495"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="rightSide">
        <form className="candle-form center-form" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="first-name"
            className="block text-sm font-semibold leading-6 text-accent-content"
          >
            LIGHT A PRAY CANDLE
          </label>
          <br />
          <div className="form-group">
            <div className="mt-2.5">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChangeForm}
                required
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2.5">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChangeForm}
                required
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChangeForm}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2.5">
              <input
                type="email"
                name="confirmEmail"
                id="confirmEmail"
                placeholder="Confirm Email"
                value={form.confirmEmail}
                onChange={handleChangeForm}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

            <div className="form-group church-selection">
              <label className="church-label">Select church to light the candle in:</label>
              <div className="church-options">
                <label className="church-option">
                  <input
                    type="radio"
                    value="Latin church"
                    checked={selectedChurch === "Latin church"}
                    onChange={handleChurchSelection}
                    required
                    className="radio-input"
                  />
                  Latin church
                </label>
                <label className="church-option">
                  <input
                    type="radio"
                    value="Greek church"
                    checked={selectedChurch === "Greek church"}
                    onChange={handleChurchSelection}
                    required
                    className="radio-input"
                  />
                  Greek church
                </label>
              </div>
            </div>

          </div>

          <label
            className="block text-sm font-semibold leading-6 text-accent-content text-center"
          >
            To light a candle, pay 5$
          </label>

          <div className='hero-btns-candle'>
            <button onClick={handleLightButton}>LIGHT</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Candle;
