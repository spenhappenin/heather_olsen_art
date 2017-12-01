import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './components/ScrollToTop';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
