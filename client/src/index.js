import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ScrollToTop from './components/shared/ScrollToTop';
import FetchUser from './components/shared/FetchUser'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, } from "./providers/AuthProvider";
import { CartProvider, } from "./providers/CartProvider";
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import { initMiddleware, } from 'devise-axios';

import registerServiceWorker from './registerServiceWorker';

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <FetchUser>
        <BrowserRouter>
            <ScrollToTop>
              <App />
            </ScrollToTop>
        </BrowserRouter>
      </FetchUser>
    </CartProvider>
  </AuthProvider>,
  document.getElementById('root')
);

registerServiceWorker();