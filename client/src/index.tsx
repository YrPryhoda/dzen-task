import React from 'react';
import ReactDOM from 'react-dom/client';
import './common/styles/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div>Root</div>
  </React.StrictMode>,
);
