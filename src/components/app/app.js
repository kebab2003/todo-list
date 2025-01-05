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
  };

  onInput = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  addItem = (text) => {
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
        },
      ],
    }));
  };

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.addItem(this.state.inputValue);
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
        <AppHeader onInput={this.onInput} inputValue={this.state.inputValue} onEnter={this.onEnter} />
        <section className="main">
          <TaskList
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
