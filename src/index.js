import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './App';
import storageUtils from './utils/storageUtils'
import memeoryUtils from './utils/memoryUtils'

const user = storageUtils.getUser()
memeoryUtils.user = user

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


