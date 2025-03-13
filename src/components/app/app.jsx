import AppHeader from '../app-header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeViewMode, setActiveViewMode] = useState('all');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning] = useState(false);
  const [timeLeft] = useState(0);

  const timers = useRef({});

  useEffect(
    () => () => {
      Object.values(timers.current).forEach(clearInterval);
    },
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minutes') setMinutes(parseInt(value, 10) || 0);
    if (name === 'seconds') setSeconds(parseInt(value, 10) || 0);
  };

  const startTimer = (id) => {
    setTodoData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isRunning: true } : item)));

    timers.current[id] = setInterval(() => {
      setTodoData((prevData) =>
        prevData.map((task) => {
          if (task.id === id) {
            const newTimeLeft = task.timeLeft - 1;
            if (newTimeLeft <= 0) {
              clearInterval(timers.current[id]);
              return { ...task, timeLeft: 0, isRunning: false };
            }
            return { ...task, timeLeft: newTimeLeft };
          }
          return task;
        })
      );
    }, 1000);
  };

  const pauseTimer = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];

    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, isRunning: false } : task)));
  };

  const addItem = (text, min, sec) => {
    if (!text.length) return;
    setTodoData((prevData) => [
      ...prevData,
      {
        label: text,
        important: false,
        id: prevData.length + 1,
        mode: 'active',
        isClosed: false,
        createdAt: new Date(),
        minutes: min,
        seconds: sec,
        isRunning: false,
        timeLeft: minutes * 60 + seconds,
      },
    ]);
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      addItem(inputValue, minutes, seconds);
      setInputValue('');
    }
  };

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((todo) => todo.id !== id));
  };

  const completedItem = (id) => {
    setTodoData((prevData) =>
      prevData.map((task) =>
        task.id === id ? { ...task, mode: task.mode === 'completed' ? 'active' : 'completed' } : task
      )
    );
  };

  const onEditStart = (id) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, mode: 'editing' } : task)));
  };

  const onClear = () => {
    setTodoData((prevData) => prevData.filter(({ mode }) => mode !== 'completed'));
  };

  const onEdit = (text, id) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, label: text } : task)));
  };

  const onFinishEdit = (e, id) => {
    if (e.key === 'Enter') {
      setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, mode: 'active' } : task)));
    }
  };

  return (
    <section className="todoapp">
      <AppHeader
        onInput={setInputValue}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        onEnter={onEnter}
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
      />
      <section className="main">
        <TaskList
          timeLeft={timeLeft}
          isRunning={isRunning}
          minutes={minutes}
          seconds={seconds}
          handleInputChange={handleInputChange}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          todos={todoData}
          onStartEdit={onEditStart}
          onDeleteItem={deleteItem}
          completedItem={completedItem}
          onInput={setInputValue}
          onEnter={onEnter}
          inputValue={inputValue}
          onEdit={onEdit}
          onFinishEdit={onFinishEdit}
          activeViewMode={activeViewMode}
        />
        <Footer
          totalCount={todoData.filter(({ mode }) => mode !== 'completed').length}
          onClear={onClear}
          setActiveViewMode={setActiveViewMode}
          viewMode={activeViewMode}
        />
      </section>
    </section>
  );
}

export default App;
