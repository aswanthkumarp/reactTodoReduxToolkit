// src/TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../state/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: 'in-progress',
  });

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ ...task, id: Date.now() }));
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      status: 'in-progress',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <strong>Task Title:</strong>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          placeholder="Enter task title"
          required
        />
      </label>
      <label>
        <strong>Description:</strong>
        <textarea
          name="description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Enter task description"
        />
      </label>
      <label>
        <strong>Due Date:</strong>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <strong>Priority:</strong>
        <select
          name="priority"
          value={task.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
