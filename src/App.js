import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FeatheryClient from 'feathery-js-client-sdk'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkbox, Input, Button } from 'semantic-ui-react'

const key = 'b.edwards@walmart.com';

function App() {
  const client = new FeatheryClient('bd6b24fd-ef14-49a6-9411-0db91b0b066f', key);
  const [servars, setServars] = useState([]);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [stepNum, setStepNum] = useState(null);

  const fillDefaults = servars => {
    return servars.map(s => {
      if (s.value === null) {
        if (s.type === "checkbox") s.value = false;
        else if (s.type === "integer_field") s.value = 0;
        else s.value = "";
      }
      return s;
    })
  }

  useEffect(() => {
    client.fetchFirstIncompleteStep()
    .then(step => {
      setServars(fillDefaults(step.servars));
      setStepNum(step.step);
      if (step.header) setHeader(step.header);
      if (step.description) setDescription(step.description);
    })
    .catch(error => {console.error(error)});
  }, [client])

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newServars = servars.map((s) => {
      if (s.id !== name) return s;
      s.value = value;
      return s;
    })
    setServars(newServars);
  }

  const submit = (close) => () => {
      const submitServars = servars.map(s => {
        return {"key": s.key, [s.type]: s.value};
      });
      client.submitStep(stepNum, submitServars)
      .then(step => {
        if (step.step === null) close();
        else {
          setServars(fillDefaults(step.servars));
          setStepNum(step.step);
          if (step.header) setHeader(step.header);
          else setHeader("");
          if (step.description) setDescription(step.description);
          else setDescription("");
        }
      })
      .catch(error => {
        console.error(error)
      });
  }

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
                            checked={servar.value}
                            key={servar.id}
                            name={servar.id}
                            onChange={handleChange}
                          >
                          </Checkbox>
                        </div>
                      );
                    case 'integer_field':
                      return (
                        <div>
                          <h3>{servar.name}</h3>
                          <Input
                            type="number"
                            value={servar.value}
                            name={servar.id}
                            onChange={handleChange}
                          />
                        </div>
                      )
                    default:
                      return (
                        <div>
                          <h3>{servar.name}</h3>
                          <div style={{ width: 160 }}>
                            <Input
                                value={servar.value}
                                name={servar.id}
                                onChange={handleChange}
                            />
                          </div>
                        </div>
                      );
                  }
                })}
                <br />
                <Button onClick={submit(close)}>
                  Next
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
