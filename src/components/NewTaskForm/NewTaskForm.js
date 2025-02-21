import { Component } from 'react';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.props.inputValue}
          onChange={(e) => this.props.onInput(e.target.value)}
          onKeyUp={(e) => this.props.onEnter(e, this.props.minutes, this.props.seconds)}
        />
        <input
          type="number"
          name="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.props.minutes}
          onChange={(e) => this.props.handleInputChange(e)}
        />
        <input
          type="number"
          name="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.props.seconds}
          onChange={(e) => this.props.handleInputChange(e)}
        />
      </form>
    );
  }
}

export default NewTaskForm;
