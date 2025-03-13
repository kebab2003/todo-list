import CountdownTimer from '../Timer';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({
  id,
  label,
  mode,
  minutes,
  seconds,
  timeLeft,
  createdAt,
  completedItem,
  startTimer,
  pauseTimer,
  onStartEdit,
  onDeleteItem,
}) {
  const spendTime = () => {
    const date = formatDistanceToNow(new Date(createdAt), { includeSeconds: true });
    return date;
  };

  return mode !== 'editing' ? (
    <div className="view">
      <div>
        <input onClick={() => completedItem(id)} checked={mode === 'completed'} className="toggle" type="checkbox" />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={() => startTimer(id, minutes, seconds)}>
              {' '}
            </button>
            <button type="button" className="icon icon-pause" onClick={() => pauseTimer(id)}>
              {' '}
            </button>
            <CountdownTimer minutes={minutes} seconds={seconds} timeLeft={timeLeft} />
          </span>
          <span className="created"> created {spendTime()}</span>
        </label>
      </div>
      <button type="button" className="icon icon-edit" onClick={() => onStartEdit(id)}>
        {' '}
      </button>
      <button type="button" className="icon icon-destroy" onClick={() => onDeleteItem(id)}>
        {' '}
      </button>
    </div>
  ) : null;
}

export default Task;
