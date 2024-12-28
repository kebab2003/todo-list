import React, { Component } from "react";
import Task from "../Task";
import "./TaskList.css";

class TaskList extends Component {
  render() {
    console.log(this.props);

    return (
      <ul className="todo-list">
        {this.props.todos
          .filter(({ mode }) => {
            if(this.props.activeViewMode === "all") {
              return true
            } 
            return this.props.activeViewMode === mode
          })
          .map((todo) => {
            return (
              <li key={todo.id} className={todo.mode}>
                <Task
                  label={todo.label}
                  onDeleteItem={this.props.onDeleteItem}
                  id={todo.id}
                  completedItem={this.props.completedItem}
                  onStartEdit={this.props.onStartEdit}
                  onEdit={this.props.onEdit}
                  onInput={this.props.onInput}
                  inputValue={this.props.inputValue}
                  onEnter={this.props.onEnter}
                  onFinishEdit={this.props.onFinishEdit}
                  mode={todo.mode}
                />
                <input
                  type="text"
                  class="edit"
                  value={todo.label}
                  onChange={(e) => this.props.onEdit(e.target.value, todo.id)}
                  onKeyUp={(e) => this.props.onFinishEdit(e, todo.id)}
                ></input>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default TaskList;
