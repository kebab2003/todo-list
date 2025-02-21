import AppHeader from '../app-header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import { Component } from 'react';

// const todoData = [
//   { label: "Completed task ", important: false, id: 1, mode: "completed" },
//   { label: "Editing task ", important: true, id: 2, mode: "editing" },
//   { label: "Active task ", important: false, id: 3, mode: "active" },
// ];

class App extends Component {
  state = {
    todoData: [],
    inputValue: '',
    activeViewMode: 'all',
    minutes: 0,
    seconds: 0,
    isRunning: false,
    timeLeft: 0,
  };

  timers = {};

  componentWillUnmount() {
    Object.values(this.timers).forEach(clearInterval);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: parseInt(value, 10) || 0 });
  };

  startTimer = (id) => {
    const { todoData } = this.state;

    const currentTask = todoData.find((todo) => todo.id === id);

    if (currentTask.isRunning || currentTask.timeLeft <= 0) return;

    if (this.timers[id]) {
      clearInterval(this.timers[id]);
    }

    this.setState({
      todoData: todoData.map((item) => {
        if (item.id === id) {
          return { ...item, isRunning: true };
        }
        return item;
      }),
    });

    this.timers[id] = setInterval(() => {
      this.setState((state) => ({
        todoData: state.todoData.map((task) => {
          if (task.id === id) {
            const newTimeLeft = task.timeLeft - 1;

            if (newTimeLeft <= 0) {
              clearInterval(this.timers[id]);
              return { ...task, timeLeft: 0, isRunning: false };
            }

            return { ...task, timeLeft: newTimeLeft };
          }
          return task;
        }),
      }));
    }, 1000);
  };

  pauseTimer = (id) => {
    if (this.timers[id]) {
      clearInterval(this.timers[id]);
      delete this.timers[id];
    }

    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, isRunning: false } : task)),
    }));
  };

  onInput = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  addItem = (text, minutes, seconds) => {
    if (!text.length) return;
    this.setState(({ todoData }) => ({
      todoData: [
        ...todoData,
        {
          label: text,
          important: false,
          id: todoData.length + 1,
          mode: 'active',
          isClosed: false,
          createdAt: new Date(),
          minutes,
          seconds,
          isRunning: false,
          timeLeft: minutes * 60 + seconds,
        },
      ],
    }));
  };

  onEnter = (e, minutes, seconds) => {
    if (e.key === 'Enter') {
      this.addItem(this.state.inputValue, minutes, seconds);
      this.setState({
        inputValue: '',
      });
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((todo) => todo.id !== id);
      return {
        todoData: newTodoData,
      };
    });
  };

  completedItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((value) => {
        if (value.id === id) {
          if (value.mode === 'completed') {
            value.mode = 'active';
          } else {
            value.mode = 'completed';
          }
        }
        return value;
      }),
    }));
  };

  onEditStart = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((value) => {
        if (value.id === id) {
          value.mode = 'editing';
        }
        return value;
      }),
    }));
  };

  onClear = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(({ mode }) => {
        if (mode !== 'completed') {
          return true;
        }
        return false;
      }),
    }));
  };

  onEdit = (text, id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((value) => {
        if (value.id === id) {
          value.label = text;
        }
        return value;
      }),
    }));
  };

  onFinishEdit = (e, id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((value) => {
        if (value.id === id && e.key === 'Enter') {
          value.mode = 'active';
        }
        return value;
      }),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <AppHeader
          onInput={this.onInput}
          handleInputChange={this.handleInputChange}
          inputValue={this.state.inputValue}
          onEnter={this.onEnter}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          isRunning={this.state.isRunning}
        />
        <section className="main">
          <TaskList
            timeLeft={this.state.timeLeft}
            isRunning={this.state.isRunning}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            handleInputChange={this.handleInputChange}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
            todos={this.state.todoData}
            onStartEdit={this.onEditStart}
            onDeleteItem={this.deleteItem}
            completedItem={this.completedItem}
            onInput={this.onInput}
            onEnter={this.onEnter}
            inputValue={this.state.inputValue}
            onEdit={this.onEdit}
            onFinishEdit={this.onFinishEdit}
            activeViewMode={this.state.activeViewMode}
          />
          <Footer
            totalCount={
              this.state.todoData.filter(({ mode }) => {
                if (mode === 'completed') {
                  return false;
                }
                return true;
              }).length
            }
            onClear={this.onClear}
            setActiveViewMode={(mode) => this.setState(() => ({ activeViewMode: mode }))}
            viewMode={this.state.activeViewMode}
          />
        </section>
      </section>
    );
  }
}

export default App;
