import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './components/shared/ScrollToTop';
import store from './store';
import FetchUser from './components/shared/FetchUser'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, } from "./providers/AuthProvider";
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <FetchUser>
        <BrowserRouter>
            <ScrollToTop>
              <App />
            </ScrollToTop>
        </BrowserRouter>
      </FetchUser>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();