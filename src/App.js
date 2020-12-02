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

  function TdElems(props) {
    return <td onClick={() =>fillingField(props.i, props.j)}>{props.item}</td>
  }
  const trElems = state.field.map((elem, i) =>
    <tr key={i}>
      {elem.map((item, j) => <TdElems key={(i+1)*(j+1)} i={i} j={j} item={item} />)}
    </tr>
  )

  function fillingField(i, j) {
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
        ...state,
        field: array,
        queue: !state.queue
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
    let smbdWin = false;
    function winCondition(element) {
      return element === marker
    }

    for (let i = 0; i < matrix.length; i++) {
      if(matrix[i].every(winCondition)) {
        smbdWin = true;
      }
      for (let j = 0; j < matrix[i].length; j++) {
        if (0 < i && i < matrix.length-1) {
          if(matrix[i-1][j] === marker && matrix[i][j] === marker && matrix[i+1][j] === marker) {
            smbdWin = true;
          }
        }
      }
    }

    const firstDiagonal = matrix.map((arrs, index) => arrs.slice(index, index+1).join()).slice().every(winCondition),
          secondDiagonal = matrix.map((arrs, index) => arrs.slice(arrs.length-(1 + index), arrs.length-index).join()).slice().every(winCondition);

    if (firstDiagonal || secondDiagonal) {
      smbdWin = true;
    }

    if(smbdWin) {
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
  }

  function showField(){
    setState(state => {
      return {
        ...state,
        start: true
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
        ...state,
        field: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        start: true,
        modal: false
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