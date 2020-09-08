import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FeatheryClient from 'feathery-js-client-sdk'
import { Feathery, useFeathery, FeatheryPanel } from 'feathery-react-client-sdk';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkbox, Input, Button } from 'semantic-ui-react'
import InputNumber from 'rc-input-number';

function App() {
  const client = new FeatheryClient('ae33f899-e913-4e10-9fe7-c229931a382b', 'b.edwards@walmart.com');
  const [servars, setServars] = useState([]);

  useEffect(() => {
    client.fetchPanel()
    .then(panel => {
      console.log(panel);
      setServars(panel.servars);
    })
    .catch(error => {console.error(error)});
  }, [])

  return (
    <Feathery sdkKey='ae33f899-e913-4e10-9fe7-c229931a382b' userKey='b.edwards@walmart.com'>
      <div className="App">
        {/* <MyComponent /> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to a SaaS!
          </p>
          <Popup trigger={<button>Configure your settings</button>} modal>
            {close => (
              <div className="modal">
                <h1>Configuration</h1>
                {servars.map((servar) => {
                  switch(servar.type) {
                    case 'checkbox':
                      return (
                        <div>
                          <h3>{servar.name}</h3>
                          <Checkbox
                            defaultChecked={servar.value}
                            key={servar.id}
                          > 
                          </Checkbox>
                        </div>
                      );
                    case 'integer_field':
                      return (
                        <div>
                          <h3>{servar.name}</h3>
                          <InputNumber
                            defaultValue={servar.value}
                          />
                        </div>
                      )
                    default:
                      return (
                        <div>
                          <h3>{servar.name}</h3>
                          <div style={{ width: 160 }}>
                            <Input defaultValue={servar.value} />
                          </div>
                        </div>
                      );
                  }
                })}
                <br />
                <Button onClick={close}>
                  Done
                </Button>

            </div>
            )}
          </Popup>

          {/* <FeatheryPanel /> */}
        </header>
      </div>
    </Feathery>
  );
}

export default App;
