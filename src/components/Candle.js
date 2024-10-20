import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Candle.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Candle() {
  const { t } = useTranslation(); // Initialize translation hook

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
      setInputWarning(t("candle.inputWarning")); // Use translation
      setTimeout(() => {
        setInputWarning(""); // Clear the warning message after 2 seconds
      }, 2000);
      return;
    }

    // Check if both email inputs match
    if (form.email !== form.confirmEmail) {
      setEmailMatchError(t("candle.emailsDontMatch")); // Use translation
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
        <div>
          <h2 style={{ color: "white", textAlign: "center", fontSize: "2em" }}>{t("candle.howToLightACandle")}</h2>
          <p style={{ color: "white", textAlign: "center", fontSize: "1.5em" }}>{t("candle.itsSimple")}</p>
          <ul style={{ color: "white", fontSize: "1.2em" }}>
            <li>{t("candle.step1")}</li>
            <li>{t("candle.step2")}</li>
            <li>{t("candle.step3")}</li>
          </ul>
        </div>
        <br />
        <p style={{ color: "white" }}>{t("candle.note")}</p>

        <div className="video-container">
          <video controls poster="/images/lightAcandle.jpg">
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
            {t("candle.lightAPrayCandle")}
          </label>
          <br />
          <div className="form-group church-selection">
            <label className="church-label">{t("candle.selectChurch")}</label>
            <div className="church-options">
            <label className="church-option">
                <input
                  type="radio"
                  value="Annunciation church"
                  checked={selectedChurch === "Annunciation church"}
                  onChange={handleChurchSelection}
                  required
                  className="radio-input"
                />
                <span className="custom-radio"></span>
                Annunciation church
              </label>
              <label className="church-option">
                <input
                  type="radio"
                  value="Greek orthodox church"
                  checked={selectedChurch === "Greek orthodox church"}
                  onChange={handleChurchSelection}
                  required
                  className="radio-input"
                />
                <span className="custom-radio"></span>
                Greek orthodox church
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="mt-2.5">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder={t("candle.firstName")}
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
                placeholder={t("candle.lastName")}
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
                placeholder={t("candle.yourEmail")}
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
                placeholder={t("candle.confirmEmail")}
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
                placeholder={t("candle.yourPrayer")}
                value={form.pray}
                onChange={handleChangeForm}
                required
                className="form-control"
              ></textarea>
              {inputWarning && <p className="error-message">{inputWarning}</p>}
            </div>
          </div>

          <label
            className="block text-sm font-semibold leading-6 text-accent-content text-center"
          >
            {t("candle.toLightACandlePay")}
          </label>

          <div className='hero-btns-candle'>
            <button onClick={handleLightButton}>{t("candle.light")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Candle;
