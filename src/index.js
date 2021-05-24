import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './App';
import storageUtils from './utils/storageUtils'
import memeoryUtils from './utils/memoryUtils'

const user = storageUtils.getUser()
const signer = storageUtils.getUid()
memeoryUtils.user = user
memeoryUtils.signer = signer

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


