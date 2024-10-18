import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import
import App from './App';
import './i18n'; // Make sure to import the i18n configuration

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
