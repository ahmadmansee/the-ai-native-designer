import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './presentation/App.jsx';
import { RealityReview } from './presentation/RealityReview.jsx';
import './styles.css';
import './brand.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {new URLSearchParams(window.location.search).get('review') === 'reality' ? <RealityReview /> : <App />}
  </React.StrictMode>,
);
