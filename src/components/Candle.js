import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Candle.css';
import { useTranslation } from 'react-i18next';

function Candle() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    pray: ""
  });

  const [selectedChurch, setSelectedChurch] = useState("");
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
    setSelectedChurch(e.target.value);
  };

  const handleLightButton = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.confirmEmail || !form.pray || !selectedChurch) {
      setInputWarning(t("candle.inputWarning"));
      setTimeout(() => {
        setInputWarning("");
      }, 2000);
      return;
    }

    if (form.email !== form.confirmEmail) {
      setEmailMatchError(t("candle.emailsDontMatch"));
      setTimeout(() => {
        setEmailMatchError("");
      }, 2000);
      return;
    }

    try {
      const updatedPray = `${selectedChurch}, ${form.pray}`;
      setForm((prevForm) => ({ ...prevForm, pray: updatedPray }));

      navigate("/checkoutcandle", { state: { form: { ...form, pray: updatedPray } } });
    } catch (error) {
      console.error("Error lighting a candle:");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="candle">
      {/* Right side moved to the left */}
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
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm"
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

          <label className="block text-sm font-semibold leading-6 text-accent-content text-center">
            {t("candle.toLightACandlePay")}
          </label>

          <div className="hero-btns-candle">
            <button onClick={handleLightButton}>{t("candle.light")}</button>
          </div>
        </form>
      </div>

      {/* Left side moved to the right */}
      <div className="leftSide">
        <div>
          <h2 style={{ color: "white", textAlign: "center", fontSize: "2em" }}>
            {t("candle.howToLightACandle")}
          </h2>
          <p style={{ color: "white", textAlign: "center", fontSize: "1.5em" }}>
            {t("candle.itsSimple")}
          </p>
          <ol style={{ color: "white", fontSize: "1.2em" }}>
            <li>{t("candle.step1")}</li>
            <li>{t("candle.step2")}</li>
            <li>{t("candle.step3")}</li>
          </ol>
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
    </div>
  );
}

export default Candle;
