import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

// const cron = require('node-cron');

//     cron.schedule('* * * * * *', () => {
//     console.log('running a task every minute');
//     });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
