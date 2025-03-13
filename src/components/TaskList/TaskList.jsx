import Task from '../Task';
import './TaskList.css';

function TaskList({
  todos,
  activeViewMode,
  startTimer,
  pauseTimer,
  onDeleteItem,
  completedItem,
  onStartEdit,
  onEdit,
  onInput,
  inputValue,
  onEnter,
  onFinishEdit,
}) {
  return (
    <ul className="todo-list">
      {todos
        .filter(({ mode }) => activeViewMode === 'all' || activeViewMode === mode)
        .map((todo) => (
          <li key={todo.id} className={todo.mode}>
            <Task
              minutes={todo.minutes}
              seconds={todo.seconds}
              timeLeft={todo.timeLeft}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              label={todo.label}
              onDeleteItem={onDeleteItem}
              id={todo.id}
              completedItem={completedItem}
              onStartEdit={onStartEdit}
              onEdit={onEdit}
              onInput={onInput}
              inputValue={inputValue}
              onEnter={onEnter}
              onFinishEdit={onFinishEdit}
              mode={todo.mode}
              createdAt={todo.createdAt}
            />
            <input
              type="text"
              className="edit"
              value={todo.label}
              onChange={(e) => onEdit(e.target.value, todo.id)}
              onKeyUp={(e) => onFinishEdit(e, todo.id)}
            />
          </li>
        ))}
    </ul>
  );
}

export default TaskList;
