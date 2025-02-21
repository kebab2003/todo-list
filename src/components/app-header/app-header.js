import NewTaskForm from '../NewTaskForm';
import { Component } from 'react';

// const AppHeader = () => {
//     return (
//       <header className="header">
//         <h1>todos</h1>
//         <NewTaskForm/>
//       </header>
//     );
//   };

class AppHeader extends Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          minutes={this.props.minutes}
          seconds={this.props.seconds}
          handleInputChange={this.props.handleInputChange}
          onInput={this.props.onInput}
          inputValue={this.props.inputValue}
          onEnter={this.props.onEnter}
        />
      </header>
    );
  }
}

export default AppHeader;
