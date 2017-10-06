import React, {Component} from 'react';

class Column extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div>
       <h1>{this.props.status}</h1>
      </div>
    )
  }
}
export default Column
