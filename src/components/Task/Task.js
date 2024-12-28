import React, { Component } from "react";
import './Task.css';

class Task extends Component {

   
    
    onLabelClick = () => {
        
    };



    
    
    render() {

      
    return (
      <> {this.props.mode !== 'editing' ? <div className="view">
        <div onClick={()=> this.props.completedItem(this.props.id)}>
        <input checked={this.props.mode==="completed"} className="toggle" type="checkbox"/>
        <label>
          <span className="description">{this.props.label}</span>
          <span className="created"> created 5 minutes ago</span>
        </label>
        </div>
        <button className="icon icon-edit" onClick={() => this.props.onStartEdit(this.props.id)}></button>
        <button className="icon icon-destroy" onClick = {()=> this.props.onDeleteItem(this.props.id)}></button>
      </div>
    :  null}</>
      )
}
}


export default Task;