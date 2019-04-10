import React from 'react';
import ReactDOM from 'react-dom';

import StateApi from 'DataApi';
import App from 'Components/App';

const store = new StateApi(window.initialData);

ReactDOM.hydrate(
  <App store={store} />,
  document.getElementById('root')
);