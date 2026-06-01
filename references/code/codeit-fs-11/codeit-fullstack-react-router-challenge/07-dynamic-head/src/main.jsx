import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
// TODO: HelmetProvider를 import 하세요.

import './styles/reset.css';
import './index.css';

import { App } from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    {/* TODO: HelmetProvider로 BrowserRouter를 감싸세요. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
