import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { NewEntryProvider } from './contexts/new-entry.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NewEntryProvider>
          <App />
        </NewEntryProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
