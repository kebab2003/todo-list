import './NewTaskForm.css';

function NewTaskForm({ inputValue, onInput, onEnter, minutes, seconds, handleInputChange }) {
  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => onInput(e.target.value)}
        onKeyUp={(e) => onEnter(e, minutes, seconds)}
      />
      <input
        type="number"
        name="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default NewTaskForm;
