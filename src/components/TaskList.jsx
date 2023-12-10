import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../state/tasksSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [sortCriteria, setSortCriteria] = useState({
    field: 'dueDate',
    order: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field) => {
    setSortCriteria({
      field,
      order:
        sortCriteria.field === field && sortCriteria.order === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  // Sort tasks based on the selected criteria
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortCriteria.field === 'dueDate') {
      return sortCriteria.order === 'asc'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    } else if (sortCriteria.field === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return sortCriteria.order === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <label>
          Sort By:
          <select
            value={sortCriteria.field}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value='dueDate'>Due Date</option>
            <option value='priority'>Priority</option>
          </select>
        </label>
        <label>
          Search:
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
