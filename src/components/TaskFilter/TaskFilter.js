import React, {Component} from "react";
import './TaskFilter.css';

class TaskFilter extends Component {
    render() {
      
        return (
        <ul className="filters">
            <li onClick={() => this.props.setActiveViewMode("all")}>
              <button className={this.props.viewMode === "all" && "selected"}>All</button>
            </li>
            <li onClick={() => this.props.setActiveViewMode("active")}>
              <button className={this.props.viewMode === "active" && "selected"}>Active</button>
            </li>
            <li onClick={() => this.props.setActiveViewMode("completed")}>
              <button className={this.props.viewMode === "completed" && "selected"}>Completed</button>
            </li>
        </ul>
        )
    };
};


export default TaskFilter;