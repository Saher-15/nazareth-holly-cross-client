import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your App component

const root = createRoot(document.getElementById("root")); // Use createRoot from react-dom/client

root.render(
    <Router>
        <App />
    </Router>
);
