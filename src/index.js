import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './reudx/configStore';

const rrConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

ReactDOM.render(
  <Provider store={store}>
    {/* <ReactReduxFirebaseProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ReactReduxFirebaseProvider> */}
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
