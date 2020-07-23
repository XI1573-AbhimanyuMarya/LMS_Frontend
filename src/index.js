import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routers from './routers/index'; 
import './scss/index.scss';

ReactDOM.render(
  <Routers />,
  document.getElementById('root')
);

serviceWorker.unregister();
