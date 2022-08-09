import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { reducer } from './state/reducer';
import { StateProvider } from './state/state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <BrowserRouter>
      <StateProvider reducer={reducer}>
        <App />
      </StateProvider>
   </BrowserRouter>


);

