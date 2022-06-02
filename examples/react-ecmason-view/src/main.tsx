import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { setupTransformers } from 'react-ecmason-view';
import App from './App';

import 'normalize.css/normalize.css';
import './main.css';

setupTransformers();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
