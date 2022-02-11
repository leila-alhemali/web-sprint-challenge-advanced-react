import React from 'react'
import axios from 'axios'

const initialState = {
 grid: {"x":2, "y":2},
 counter: 0,
 message: '',
 email: ''
}

export default class AppClass extends React.Component {

  state = initialState



  onChange = event => {
    const { value } = event.target
    this.setState({ ...this.state, email: value})
  }

  onSubmit = event => {
    event.preventDefault()
    const payloadToSend = {"x": this.state.grid.x,
    "y": this.state.grid.y, "steps": this.state.counter, "email": this.state.email}
    axios.post('http://localhost:9000/api/result', payloadToSend)
    .then (resp => {
      this.setState({ ...this.state, message: resp.data.message})
      console.log(this.state)
  
    })
    .catch(err => {
      console.log(err)})
  }


  componentDidUpdate() {
    console.log(this.state)
  }


  moveUp = () => {
    if (this.state.grid.y > 1) {
      this.setState({ ...this.state,
        counter: this.state.counter + 1, 
        grid: {...this.state.grid, y: this.state.grid.y - 1}, 
        message: ''});
      console.log(this.state)
    }
    else {
      this.setState({ ...this.state, message: "You can't go up"})
    }
  }

  moveDown = () => {
    if (this.state.grid.y < 3) {
      this.setState({ ...this.state,
        counter: this.state.counter + 1, 
        grid: { ...this.state.grid, y: this.state.grid.y + 1},
        message: ''});
      console.log(this.state)
    }
    else {
      this.setState({ ...this.state, message: "You can't go down"})
    }
  }

  moveLeft = () => {
    if (this.state.grid.x > 1) {
      this.setState({ ...this.state,
        counter: this.state.counter + 1, 
        grid: {...this.state.grid, x: this.state.grid.x - 1},
        message: ''});
      console.log(this.state)
    }
    else {
      this.setState({ ...this.state, message: "You can't go left"})
    }
  }

  moveRight = () => {
    if (this.state.grid.x < 3) {
      this.setState({ ...this.state,
        counter: this.state.counter + 1, 
        grid: {...this.state.grid, x: this.state.grid.x + 1},
        message: ''});
      console.log(this.state)
    }
    else {
      this.setState({ ...this.state, message: "You can't go right"})
    }
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.grid.x}, {this.state.grid.y} </h3>
          <h3 id="steps">You moved {this.state.counter} times</h3>
        </div>
        <div id="grid">
          <div className={`${this.state.grid.x == 1 && this.state.grid.y == 1 ? "square active" : "square"}`}>{this.state.grid.x === 1 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 2 && this.state.grid.y == 1 ? "square active" : "square"}`}>{this.state.grid.x === 2 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 3 && this.state.grid.y == 1 ? "square active" : "square"}`}>{this.state.grid.x === 3 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 1 && this.state.grid.y == 2 ? "square active" : "square"}`}>{this.state.grid.x === 1 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 2 && this.state.grid.y == 2 ? "square active" : "square"}`}>{this.state.grid.x === 2 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 3 && this.state.grid.y == 2 ? "square active" : "square"}`}>{this.state.grid.x === 3 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 1 && this.state.grid.y == 3 ? "square active" : "square"}`}>{this.state.grid.x === 1 && this.state.grid.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 2 && this.state.grid.y == 3 ? "square active" : "square"}`}>{this.state.grid.x === 2 && this.state.grid.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.grid.x == 3 && this.state.grid.y == 3 ? "square active" : "square"}`}>{this.state.grid.x === 3 && this.state.grid.y === 3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.moveLeft} id="left">LEFT</button>
          <button onClick={this.moveUp} id="up">UP</button>
          <button onClick={this.moveRight} id="right">RIGHT</button>
          <button onClick={this.moveDown} id="down">DOWN</button>
          <button onClick={() =>{this.setState({...this.state, counter: 0, grid: {"x":2, "y":2}, message: ""})} }id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
