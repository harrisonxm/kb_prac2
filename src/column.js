import React, {Component} from 'react';

class Column extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks || []
    }
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }
  componentWillReceiveProps(newProps){
    if(localStorage.tasks){
      let updatedTasks = JSON.parse(localStorage.getItem('tasks'));
      //check if localStorage has updated if so then setState to rerender
      if(updatedTasks !== this.state.tasks){
        this.setState({tasks: updatedTasks})
      }
    }
  }
  renderTasks(){
    //return list of specific lists
    return this.state.tasks.map((task, index) => {
      //render tasks on correct columns, if status doesnt match props status then don't render 
      let t = task[0] === this.props.status ? task[1] : null;
      if(t){
        if(task[0] === 'New'){
          return(
            <li key={index}>
            {t}
            <button className="btn btn-xs btn-success" data-index={index} data-task={task[0]} onClick={this.moveRight}>Right</button>
            </li>
          )
        }
        if(task[0] === 'In Process'){
          return(
            <li key={index}>
              {t}
              <button className="btn btn-xs btn-success" data-index={index} data-task={task[0]} onClick={this.moveRight}>Right</button>
              <button className="btn btn-xs btn-danger" data-index={index} data-task={task[0]} onClick={this.moveLeft}>Left</button>
            </li>
          )
        }
        if(task[0] === 'Review'){
          return(
            <li key={index}>
              {t}
              <button className="btn btn-xs btn-success" data-index={index} data-task={task[0]} onClick={this.moveRight}>Right</button>
              <button className="btn btn-xs btn-danger" data-index={index} data-task={task[0]} onClick={this.moveLeft}>Left</button>
            </li>
          )
        }
        if(task[0] === 'Completed'){
          return(
            <li key={index}>
              {t}
              <button className="btn btn-xs btn-danger" data-index={index} data-task={task[0]} onClick={this.moveLeft}>Left</button>
            </li>
          )
        }
      }
    })
  }
  moveLeft(e){
    //grab specific task and index
    let t = e.target.dataset.task;
    let i = e.target.dataset.index;
    let arr = [...this.state.tasks];
    switch(t){
      //depending on status of task if left button pressed swap status and update and local Storage
      case 'In Process':
        arr[i][0] = "New";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      case 'Review':
        arr[i][0] = "In Process";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      case 'Completed':
        arr[i][0] = "Review";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      default:
        break;
      }
  }
  moveRight(e){
    let t = e.target.dataset.task;
    let i = e.target.dataset.index;
    let arr = [...this.state.tasks];
    switch(t){
      //depending on status of task if right button pressed swap status and update state and localStorage
      case 'New':
        arr[i][0] = "In Process";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      case 'In Process':
        arr[i][0] = "Review";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      case 'Review':
        arr[i][0] = "Completed";
        localStorage.tasks = JSON.stringify(arr);
        this.setState({tasks: arr});
        this.props.updateTasks(arr);
        break;
      default:
        break;
      }
  }
  render(){
    return(
      <div className="col">
       <h1>{this.props.status}</h1>
       <ul className="tasklist">
        {this.renderTasks()}
       </ul>
      </div>
    )
  }
}
export default Column
