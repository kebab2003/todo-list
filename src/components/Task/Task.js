import CountdownTimer from '../Timer';
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
            <div>
              <input
                onClick={() => this.props.completedItem(this.props.id)}
                checked={this.props.mode === 'completed'}
                className="toggle"
                type="checkbox"
              />
              <label>
                <span className="title">{this.props.label}</span>
                <span className="description">
                  <button
                    type="button"
                    className="icon icon-play"
                    onClick={() => this.props.startTimer(this.props.id, this.props.minutes, this.props.seconds)}
                  >
                    {' '}
                  </button>
                  <button
                    type="button"
                    className="icon icon-pause"
                    onClick={() => this.props.pauseTimer(this.props.id)}
                  >
                    {' '}
                  </button>
                  <CountdownTimer
                    minutes={this.props.minutes}
                    seconds={this.props.seconds}
                    timeLeft={this.props.timeLeft}
                  />
                </span>
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
