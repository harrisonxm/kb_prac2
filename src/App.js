import React, { Component } from 'react';
import './App.css';
import Column from "./column.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: ['New', 'In Process', 'Review', 'Completed'],
      input: '',
      task: []
    }
    this.addNote = this.addNote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  addNote(e){
    e.preventDefault()
    //store each task as tuple to allow changing left or right of columns
    let task = [[e.target.name, this.state.input]]
    //before adding into specific key in local storage, grab previously stored 'tasks'
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(storedTasks)
    //first parameter is key name in local storage
    localStorage.setItem('tasks', JSON )
  }
  handleUpdate(e){
    this.setState({input : e.target.value})
  }
  render() {
    let columns = this.state.status.map((s, index) => {
      return(
        <div className="column" key={index}>
          <Column status={s} />
          <form className="addnote" name={s} onSubmit={this.addNote}>
            <input type="text" placeholder="add a note" onChange={this.handleUpdate} required></input>
            <input type="submit" value="Add"></input>
          </form>
        </div>
      )
    })
    return (
      <div className="container">
        {columns}
      </div>
    );
  }
}

export default App;
