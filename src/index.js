import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.get('/api/layout.json', { params: { user: window.location.hash } }).then((response) => {
  const layout = response.data;
  root.render(
    <React.StrictMode>
      <App page={layout} />
    </React.StrictMode>
  );
});

