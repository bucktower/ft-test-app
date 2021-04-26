import React from 'react';
import { Feathery } from 'feathery-react';

function App() {
  Feathery.init('4d4c723a-b156-43f9-96a7-36fe65b1d311', 'test-user');

  return <Feathery.Form
      formKey='check-my-offer'
      initialValues={{'offer-first-name': 'Peter', 'offer-last-name': 'Dun'}}
      onLoad={(context) => {
          if (context.stepName === 'car-info') {
              context.setValues({'test-key': 'test-value1'});
          }
      }}
  />
}

export default App;
