import React from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
import { Feathery } from 'feathery-react-client-sdk';

function App() {
  // air.inc
  return <Feathery
    sdkKey='f22d8830-d101-4599-9023-97ea74aaa4d5'
    userKey='test_user'
    clientKey=''
    redirectURI={null}
    companyKey='test_user'
  />
}

export default App;
