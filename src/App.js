import { useState } from 'react';
import './App.css';

let matrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function PlayField(props) {
  const markerTypes = ['✘', '○'] // '✘';
  const state = props.state;
  const setState = props.setState;
  
  const trElems = state.field.map((elem, i) =>
    <tr key={i}>
      {elem.map((item, j) => <td key={(i+1)*(j+1)} onClick={() =>changeText(i, j)}>{item}</td>)}
    </tr>
  )

  function changeText(i, j) {
    setState(state => {
      let marker = state.queue ? markerTypes[0] : markerTypes[1]
      const array = state.field.map((item, index) => {
        return item.map((elem, num) =>{
          if(i === index && j === num && elem === '') {
            matrix[i][j] = marker
            checkWinner(marker)
            checkDraw()
            return elem = marker
          }
          return elem
        })
      })

      return {
        field: array,
        queue: !state.queue,
        start: state.start,
        modal: state.modal,
        modalText: state.modalText
      }
    })
  }

  function checkDraw() {
    function drawCondition(el) {
      return el === ''
    }
    if(![].concat(...matrix).some(drawCondition)) {
      setState(state => {
        return {
          field: state.field,
          queue: true,
          start: true,
          modal: true,
          modalText: 'Ничья'
        }
      })
    }
  }

  function checkWinner(marker) {
    function winCondition(element) {
      return element === marker
    }

    matrix.map( arrs => {
      if(arrs.every(winCondition)) {
        setState(state => {
          return {
            field: state.field,
            queue: true,
            start: true,
            modal: true,
            modalText: marker ==='✘'? 'Победили крестики' : 'Победили нолики'
          }
        })
      }
      return arrs.every(winCondition)
    })
  }

  function showField(){
    setState(state => {
      return {
        field: state.field,
        queue: state.queue,
        start: true,
        modal: state.modal,
        modalText: state.modalText
      }
    })
  }

  if (state.start) {
    return (
      <table className='play-field'>
        <tbody>
          {trElems}
        </tbody>
      </table>
    )
  } else {
    return <button className='bttn-show-field' onClick={() => showField()}>Старт</button>
  }
}

function Modal(props) {
  const state = props.state;
  const setState = props.setState;

  function startNewGame() {
    matrix = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    setState(state => {
      return {
        field: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        queue: state.queue,
        start: true,
        modal: false,
        modalText: state.modalText
      }
    })
  }
  if(state.modal) {
    return (
      <div className='modal-overlay open'>
        <div className='modal-window'>
          <div className='modal-header'>
            <h2> {state.modalText} </h2>
          </div>
          <div className='modal-body'>
            <button onClick={() => startNewGame()} className='modal-buttons'>Начать новую игру</button>
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}



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
    <div className='container'>
      <main>
        <PlayField state={state} setState={setState}/>
      </main>
      <Modal state={state} setState={setState}/>
    </div>
  );
}

export default App;