import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../state/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
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
      priority: 'Low',
      status: 'in-progress',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border rounded-md p-8 w-full sm:w-96">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <strong>Task Title:</strong>
            <input
              className="border rounded w-full p-2 mt-1"
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </label>
          <label className="block mb-4">
            <strong>Description:</strong>
            <textarea
              className="border rounded w-full p-2 mt-1"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
          </label>
          <label className="block mb-4">
            <strong>Due Date:</strong>
            <input
              className="border rounded w-full p-2 mt-1"
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
            />
          </label>
          <label className="block mb-4">
            <strong>Priority:</strong>
            <select
              className="border rounded w-full p-2 mt-1"
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
