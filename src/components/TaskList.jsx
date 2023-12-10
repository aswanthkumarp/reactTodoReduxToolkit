// src/TaskList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../state/tasksSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editedTitle, setEditedTitle] = useState('');

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (taskId, currentTitle) => {
    setEditedTitle(currentTitle);
    dispatch(updateTask({ id: taskId, updatedTask: { title: currentTitle } }));
  };

  const handleSave = (taskId) => {
    dispatch(updateTask({ id: taskId, updatedTask: { title: editedTitle } }));
    setEditedTitle('');
  };

  return (
    <>
      {tasks.map((task) => (
        <li key={task.id}>
          {editedTitle !== '' && task.id === task.id ? (
            // Edit mode
            <>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button onClick={() => handleSave(task.id)}>Save</button>
            </>
          ) : (
            // View mode
            <>
              <TaskItem task={task} />
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <button onClick={() => handleEdit(task.id, task.title)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default TaskList;
