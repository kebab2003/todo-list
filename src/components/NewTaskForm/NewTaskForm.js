import React, { Component } from "react";
import './NewTaskForm.css';

class NewTaskForm extends Component {
    
  render() {
    return (
      
      <input className="new-todo" 
      placeholder="What needs to be done?" 
      autofocus 
      value = {this.props.inputValue} 
      onChange={(e) => this.props.onInput(e.target.value)}
      onKeyUp = {(e) => this.props.onEnter(e)}/>
      
    );
  };
}

  export default NewTaskForm;