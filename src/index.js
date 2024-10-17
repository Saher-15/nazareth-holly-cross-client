import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Make sure to import the i18n configuration

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
