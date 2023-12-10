// src/TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../state/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = e => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTask({ title: taskTitle, id: Date.now() }));
    setTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Title:
        <input
          type="text"
          value={taskTitle}
          onChange={handleInputChange}
          placeholder="Enter task title"
          required
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
