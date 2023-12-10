
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../state/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(task.status === 'completed');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  useEffect(() => {
    setIsChecked(editedTask.status === 'completed');
  }, [editedTask.status]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setEditedTask({
      ...editedTask,
      status: isChecked ? 'in-progress' : 'completed',
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask({ id: task.id, updatedTask: editedTask }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleInputChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        // Edit mode
        <>
          <label>
            <strong>Title:</strong>
            <textarea
              name='title'
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Description:</strong>
            <textarea
              name='description'
              value={editedTask.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Due Date:</strong>
            <input
              type='date'
              name='dueDate'
              value={editedTask.dueDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Priority:</strong>
            <select
              name='priority'
              value={editedTask.priority}
              onChange={handleInputChange}
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </label>
          <label>
            <strong>Status:</strong>
            <select
              name='status'
              value={editedTask.status}
              onChange={handleInputChange}
            >
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        // View mode
        <>
          <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            <strong>Title:</strong> {task.title} <br />
            <strong>Description:</strong> {task.description} <br />
            <strong>Due Date:</strong> {task.dueDate} <br />
            <strong>Priority:</strong> {task.priority} <br />
            <strong>Status:</strong> {task.status}
          </span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
