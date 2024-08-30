import React from 'react';
import ReactDOM from 'react-dom';  // Use 'react-dom' instead of 'react-dom/client'
import './index.css';
import App from './App';

// Instead of using createRoot, use ReactDOM.render for React 17
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
