import React, { Component } from 'react';
import './App.css';
import Column from "./column.js"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: ['New', 'In Process', 'Review', 'Completed'],
      input: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
    this.addNote = this.addNote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
  }
  addNote(e){
    //prevent page from refreshing after submission
    e.preventDefault();
    //store each task as tuple to allow changing left or right of columns
    let task = [[e.target.name, this.state.input]];
    //before adding into specific key in local storage, grab previously stored 'tasks'
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //first parameter is key name in local storage, destructure arrays and combine then stringify
    localStorage.setItem('tasks', JSON.stringify([...storedTasks, ...task]) );
    this.setState({tasks: localStorage.tasks});
    //grab specific input field
    let target = e.target.getElementsByClassName('input');
    //after submit note clear input line
    target[0].value = '';
  }
  handleUpdate(e){
    this.setState({input : e.target.value});
  }
  updateTasks(arr){
    //need to pass a callback func to update App.js without refreshing
    this.setState({tasks: arr});
  }
  render() {
    let columns = this.state.status.map((s, index) => {
      return(
        <div className="column" key={index}>
          <Column status={s} tasks={this.state.tasks} updateTasks={this.updateTasks} />
          <form className="addnote" name={s} onSubmit={this.addNote}>
            <input type="text" className="input" placeholder="add a note" onChange={this.handleUpdate} required></input>
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
