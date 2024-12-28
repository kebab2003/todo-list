import React, {Component} from "react";
import TaskFilter from "../TaskFilter";
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">{this.props.totalCount} items left</span>
                <TaskFilter
                viewMode={this.props.viewMode}
                setActiveViewMode ={(text) => this.props.setActiveViewMode(text)}/>
                <button className="clear-completed" onClick={() => this.props.onClear()}>Clear completed</button>
            </footer>
        );
    };
};


export default Footer;