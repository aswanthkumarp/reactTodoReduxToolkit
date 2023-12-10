// src/TaskList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../state/tasksSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = taskId => {
    dispatch(deleteTask(taskId));
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem task={task} />
          <button onClick={() => handleDelete(task.id)}>Delete</button>
          {/* You can add an edit button with a callback function for editing */}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
