import React from 'react';
import { Feathery } from 'feathery-react';

function App() {
  Feathery.init('4d4c723a-b156-43f9-96a7-36fe65b1d311', 'test-user');

  return <Feathery.Form
      formKey='check-my-offer'
      onLoad={(context) => {
          if (context.stepName === 'no-info') {
              context.setValues({'has-info': 'no'});
          } else if (context.stepName === 'pick-loan') {
              context.setOptions({'offer-multiple-loans': ['your first loan', 'your second loan']});
          }
      }}
  />
}

export default App;
