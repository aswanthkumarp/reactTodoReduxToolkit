import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortCriteria.field === 'dueDate') {
      return sortCriteria.order === 'asc'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    } else if (sortCriteria.field === 'priority') {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
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
    <div className='container mx-auto my-8 px-4 min-h-screen'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
        <div className='flex space-x-4 mb-2 md:mb-0'>
          <label className='flex items-center'>
            Sort By:
            <select
              value={sortCriteria.field}
              onChange={(e) => handleSort(e.target.value)}
              className='ml-2 p-1 border rounded-md'
            >
              <option value='dueDate'>Due Date</option>
              <option value='priority'>Priority</option>
            </select>
          </label>
        </div>

        <div className='flex space-x-4'>
          <label className='flex items-center'>
            Search:
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='ml-2 p-1 border rounded-md'
            />
          </label>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className='text-center text-gray-500'>No results found.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className='mb-4'>
              <TaskItem task={task} taskId={task.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
