import React from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
import { Feathery } from 'feathery-react-client-sdk';

function App() {
  return <Feathery
      sdkKey='bd6b24fd-ef14-49a6-9411-0db91b0b066f'
      userKey='b.edwards@walmart.com'
      redirectURI='https://google.com'
  />
}

export default App;
