import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mt-1'>
      <h1 className='text-3xl font-bold mb-4'>Task Manager</h1>
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="md:w-1/2 mb-8 md:mb-0 bg-gray-200">
          <TaskForm />
        </div>
        <div className="md:w-1/2 bg-gray-100 text-center">
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;
