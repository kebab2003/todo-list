import NewTaskForm from '../NewTaskForm';

function AppHeader({ minutes, seconds, handleInputChange, onInput, inputValue, onEnter }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm
        minutes={minutes}
        seconds={seconds}
        handleInputChange={handleInputChange}
        onInput={onInput}
        inputValue={inputValue}
        onEnter={onEnter}
      />
    </header>
  );
}

export default AppHeader;
