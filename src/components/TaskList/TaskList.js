import Task from '../Task';
import { Component } from 'react';
import './TaskList.css';

class TaskList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos
          .filter(({ mode }) => {
            if (this.props.activeViewMode === 'all') {
              return true;
            }
            return this.props.activeViewMode === mode;
          })
          .map((todo) => (
            <li key={todo.id} className={todo.mode}>
              <Task
                minutes={todo.minutes}
                seconds={todo.seconds}
                timeLeft={todo.timeLeft}
                startTimer={this.props.startTimer}
                pauseTimer={this.props.pauseTimer}
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
                createdAt={todo.createdAt}
              />
              <input
                type="text"
                className="edit"
                value={todo.label}
                onChange={(e) => this.props.onEdit(e.target.value, todo.id)}
                onKeyUp={(e) => this.props.onFinishEdit(e, todo.id)}
              />
            </li>
          ))}
      </ul>
    );
  }
}

export default TaskList;
