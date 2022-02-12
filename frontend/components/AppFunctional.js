import React, {useState} from 'react'
import axios from 'axios'


export default function AppFunctional(props) {
  const [counter, setCounter] = useState(0)
  const [grid, setGrid] = useState({"x":2, "y":2})
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const onChange = event => {
    const { value } = event.target
    setEmail(value)
  }
  
  const onSubmit = event => {
    event.preventDefault()
    const payloadToSend = {"x": grid.x, "y": grid.y, "steps": counter, "email": email}
      axios.post('http://localhost:9000/api/result', payloadToSend)
      .then (resp => {
        setMessage(resp.data.message)
        setEmail('')
      })
      .catch(err => {
        setMessage(err.response.data.message)
        })

  }

  const moveUp = () => {
    if (grid.y > 1) {
      setCounter(counter + 1 )
      setGrid({ ...grid, "y": grid.y - 1})
      setMessage('');
    }
    else {
      setMessage("You can't go up")
    }
  }

  const moveDown = () => {
    if (grid.y < 3) {
      setCounter(counter + 1 )
      setGrid({ ...grid, "y": grid.y + 1})
      setMessage('')
    }
    else {
      setMessage("You can't go down")
    }
  }

  const moveLeft = () => {
    if (grid.x > 1) {
      setCounter(counter + 1 )
      setGrid({ ...grid, "x": grid.x - 1})
      setMessage('');
     }
     else {
      setMessage("You can't go left")
     }
   }

  const moveRight = () => {
    if (grid.x < 3) {
      setCounter(counter + 1 )
      setGrid({ ...grid, "x": grid.x + 1})
      setMessage('');
     }
     else {
      setMessage("You can't go right")
     }
   }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({grid.x}, {grid.y})</h3>
        <h3 id="steps" >You moved {counter} {counter === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        <div className={`${grid.x == 1 && grid.y == 1 ? "square active" : "square"}`}>{grid.x === 1 && grid.y === 1 ? "B" : ""}</div>
        <div className={`${grid.x == 2 && grid.y == 1 ? "square active" : "square"}`}>{grid.x === 2 && grid.y === 1 ? "B" : ""}</div>
        <div className={`${grid.x == 3 && grid.y == 1 ? "square active" : "square"}`}>{grid.x === 3 && grid.y === 1 ? "B" : ""}</div>
        <div className={`${grid.x == 1 && grid.y == 2 ? "square active" : "square"}`}>{grid.x === 1 && grid.y === 2 ? "B" : ""}</div>
        <div className={`${grid.x == 2 && grid.y == 2 ? "square active" : "square"}`}>{grid.x === 2 && grid.y === 2 ? "B" : ""}</div>
        <div className={`${grid.x == 3 && grid.y == 2 ? "square active" : "square"}`}>{grid.x === 3 && grid.y === 2 ? "B" : ""}</div>
        <div className={`${grid.x == 1 && grid.y == 3 ? "square active" : "square"}`}>{grid.x === 1 && grid.y === 3 ? "B" : ""}</div>
        <div className={`${grid.x == 2 && grid.y == 3 ? "square active" : "square"}`}>{grid.x === 2 && grid.y === 3 ? "B" : ""}</div>
        <div className={`${grid.x == 3 && grid.y == 3 ? "square active" : "square"}`}>{grid.x === 3 && grid.y === 3 ? "B" : ""}</div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">LEFT</button>
        <button onClick={moveUp} id="up">UP</button>
        <button onClick={moveRight} id="right">RIGHT</button>
        <button onClick={moveDown} id="down">DOWN</button>
        <button onClick={() => {setCounter(0), setGrid({"x":2, "y":2}), setMessage(''), setEmail('')}}id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
