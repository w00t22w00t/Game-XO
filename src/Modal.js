import './Modal.css';

function Modal(props) {
  const state = props.state;
  const setState = props.setState;

  function startNewGame() {
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

export default Modal;