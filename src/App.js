import React, {useEffect, useState} from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
import { Feathery } from 'feathery-react-client-sdk';

const sdkKey = '374bc28b-a18b-4b96-807e-3f3a8ab54faa'
const userKey = 'test9'

function App() {
  Feathery.init(sdkKey, userKey);

  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    Feathery.fetchAttributes().then(newAttr => {setAttributes(newAttr)});
  }, [])

  return <Feathery.Div clientKey=''/>
}

export default App;
