import './TaskFilter.css';

function TaskFilter({ viewMode, setActiveViewMode }) {
  return (
    <ul className="filters">
      <li onClick={() => setActiveViewMode('all')}>
        <button type="button" className={viewMode === 'all' && 'selected'}>
          All
        </button>
      </li>
      <li onClick={() => setActiveViewMode('active')}>
        <button type="button" className={viewMode === 'active' && 'selected'}>
          Active
        </button>
      </li>
      <li onClick={() => setActiveViewMode('completed')}>
        <button type="button" className={viewMode === 'completed' && 'selected'}>
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
