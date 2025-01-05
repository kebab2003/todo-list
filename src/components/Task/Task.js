import { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  render() {
    const spendTime = () => {
      const date = formatDistanceToNow(new Date(this.props.createdAt), { includeSeconds: true });
      return date;
    };
    return (
      <>
        {' '}
        {this.props.mode !== 'editing' ? (
          <div className="view">
            <div onClick={() => this.props.completedItem(this.props.id)}>
              <input checked={this.props.mode === 'completed'} className="toggle" type="checkbox" />
              <label>
                <span className="description">{this.props.label}</span>
                <span className="created"> created {spendTime()}</span>
              </label>
            </div>
            <button type="button" className="icon icon-edit" onClick={() => this.props.onStartEdit(this.props.id)}>
              {' '}
            </button>
            <button type="button" className="icon icon-destroy" onClick={() => this.props.onDeleteItem(this.props.id)}>
              {' '}
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

export default Task;
