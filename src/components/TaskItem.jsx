import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../state/tasksSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEditLine } from "react-icons/ri";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(task.status === 'completed');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setIsChecked(editedTask.status === 'completed');
  }, [editedTask.status]);

  const handleCheckboxChange = () => {
    setEditedTask((prevTask) => {
      const newStatus = prevTask.status === 'completed' ? 'in-progress' : 'completed';
      return { ...prevTask, status: newStatus };
    });
    setIsChecked(!isChecked);
    console.log(editedTask.status); // Add this line to check the updated status
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
    console.log(task.priority)
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className="border p-4 mb-4">
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      {isEditing ? (
        // Edit mode
        <>
          <label className="block mb-2">
            <strong>Title:</strong>
            <textarea
              name='title'
              value={editedTask.title}
              onChange={handleInputChange}
              className="w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            <strong>Description:</strong>
            <textarea
              name='description'
              value={editedTask.description}
              onChange={handleInputChange}
              className="w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            <strong>Due Date:</strong>
            <input
              type='date'
              name='dueDate'
              value={editedTask.dueDate}
              onChange={handleInputChange}
              className="w-full border p-2"
            />
          </label>
          <label className="block mb-2">
            <strong>Priority:</strong>
            <select
              name='priority'
              value={editedTask.priority}
              onChange={handleInputChange}
              className="w-full border p-2"
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </label>
          <label className="block mb-2">
            <strong>Status:</strong>
            <select
              name='status'
              value={editedTask.status}
              onChange={handleInputChange}
              className="w-full border p-2"
            >
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </label>
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 mr-2">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2">
            Cancel
          </button>
        </>
      ) : (
        // View mode
        <>
        
          <span className={`flex flex-col mb-2 ${isChecked ? 'line-through' : ''}`}>
           
            <strong>Title:</strong> {task.title} <br />
            <strong>Description:</strong> {task.description} <br />
            <strong>Due Date:</strong> {task.dueDate} <br />
            <strong>Priority:</strong> {task.priority} <br />
            <strong>Status:</strong> {task.status}
          </span>
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 mr-2">
           <RiEditLine/>
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">
           <RiDeleteBin6Line/>
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
