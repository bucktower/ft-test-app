import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FeatheryClient from 'feathery-js-client-sdk'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkbox, Input, Button } from 'semantic-ui-react'
import InputNumber from 'rc-input-number';

const key = 'b.edwards@walmart.com';

function App() {
  const client = new FeatheryClient('ae33f899-e913-4e10-9fe7-c229931a382b', key);
  const [servars, setServars] = useState([]);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    client.fetchPanel()
    .then(panel => {
      setServars(panel.servars);
      if (panel.header) setHeader(panel.header);
      if (panel.description) setDescription(panel.description);
    })
    .catch(error => {console.error(error)});
  }, [])

  return (
    <div>
      <div className="App">
        {/* <MyComponent /> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome, {key}
          </p>
          <Popup trigger={<button>Configure your personalized settings</button>} modal>
            {close => (
              <div className="modal">
                {header && <h1>{header}</h1>}
                {description && <span>{description}</span>}
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
                  Submit
                </Button>

            </div>
            )}
          </Popup>

          {/* <FeatheryPanel /> */}
        </header>
      </div>
    </div>
  );
}

export default App;
