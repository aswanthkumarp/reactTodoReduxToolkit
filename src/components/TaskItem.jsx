// src/TaskItem.js
import React, { useState } from 'react';

const TaskItem = ({ task }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
        {task.title}
      </span>
    
    </div>
  );
};

export default TaskItem;
