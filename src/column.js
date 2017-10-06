import React, {Component} from 'react';

class Column extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks || []
    }
  }
  componentWillReceiveProps(newProps){
    if(localStorage.tasks){
      let updatedTasks = JSON.parse(localStorage.getItem('tasks'));
      if(updatedTasks !== this.state.tasks){
        this.setState({tasks: updatedTasks})
      }
    }
  }
  render(){
    console.log(this.state.tasks)
    let tasks = this.state.tasks.map((task, index) => {
      let t = task[0] === this.props.status ? task[1] : null;
      if(t){
        return (
          <li key={index}>{t}</li>
        )
      }
    })
    return(
      <div>
       <h1>{this.props.status}</h1>
       <ul>
        {tasks}
       </ul>
      </div>
    )
  }
}
export default Column
