import TaskFilter from '../TaskFilter';
import './Footer.css';

function Footer({ totalCount, viewMode, setActiveViewMode, onClear }) {
  return (
    <footer className="footer">
      <span className="todo-count">{totalCount} items left</span>
      <TaskFilter viewMode={viewMode} setActiveViewMode={setActiveViewMode} />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
