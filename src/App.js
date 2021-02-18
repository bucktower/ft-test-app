import React from 'react';
import { Feathery } from 'feathery-react';

const sdkKey = '07a5797d-f8f8-4858-9ad6-2a2dd766d63e'
const userKey = 'e'

function App() {
  Feathery.init(sdkKey, userKey);

  return <Feathery.Form formKey='screening_template'/>
}

export default App;
