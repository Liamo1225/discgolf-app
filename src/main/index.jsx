import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./modal/ModalContext.jsx";

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/discgolf-app/">
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
