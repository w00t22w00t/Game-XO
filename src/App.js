import React, { useState } from 'react';
import './App.css';

import Header from './Header';
import Modal from './Modal';
import PlayField from './Playfield';


function App() {
  const [state, setState] = useState({
    field: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    queue: true,
    start: false,
    modal: false,
    modalText: ''
  });
  
  
  return (
    <React.Fragment>
      <Header />
      <main>
        <PlayField state={state} setState={setState}/>
      </main>
      <Modal state={state} setState={setState}/>
    </React.Fragment>
  );
}

export default App;