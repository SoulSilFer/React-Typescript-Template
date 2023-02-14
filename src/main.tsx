import React, { StrictMode } from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import admin from 'firebase-admin';
import accountJson from 'core/infra/base-template-vite-ts-56843-firebase-adminsdk-8r22r-bfe0e3c043.json';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

admin.initializeApp({
  credential: admin.credential.cert(accountJson as any)
});

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
