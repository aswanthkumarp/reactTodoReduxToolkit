// src/TaskItem.js
import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <li>
      {task.title}
      {/* You can add buttons for editing and deleting tasks here */}
    </li>
  );
};

export default TaskItem;
