
import { useState, registerApp } from './reactive-engine.js';
import {
  registerHandler,
  attachEventHub,
  clearHandlers
} from './event-hub.js';

const root = document.getElementById('root');

function TaskApp() {
  
const [tasks, setTasks] = useState([
  { id: 1, title: 'Review PR', completed: false },
  { id: 2, title: 'Verify AST', completed: true }
]);

const [filter, setFilter] = useState('ALL');


  // Remove handlers from the previous render
  clearHandlers();

  // Create application container
  const container = document.createElement('main');
  container.className = 'app-container';

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = `Tasks: ${tasks.length}`;
  container.appendChild(heading);

  // Create Add Task button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Task';

  addButton.dataset.eventId = registerHandler(() => {
    
const newTask = {
  id: Date.now(),
  title: `Task ${Date.now()}`,
  completed: false
};

setTasks([...tasks, newTask]);

  });

  container.appendChild(addButton);

  // Create filter buttons
  const filterContainer = document.createElement('div');

  ['ALL', 'ACTIVE', 'COMPLETED'].forEach((option) => {
    const button = document.createElement('button');

    button.textContent = option;

    if (filter === option) {
      button.style.fontWeight = 'bold';
    }

    button.dataset.eventId = registerHandler(() => {
      setFilter(option);
    });

    filterContainer.appendChild(button);
  });

  container.appendChild(filterContainer);

  // Create task list
  const taskList = document.createElement('ul');



const visibleTasks = tasks.filter((task) => {
  if (filter === 'ACTIVE') {
    return !task.completed;
  }

  if (filter === 'COMPLETED') {
    return task.completed;
  }

  return true;
});


visibleTasks.forEach((task) => {
  const item = document.createElement('li');

  item.textContent =
    `${task.completed ? '✓' : '○'} ${task.title}`;

  item.style.cursor = 'pointer';

  item.dataset.eventId = registerHandler(() => {
    setTasks((previousTasks) =>
      previousTasks.map((currentTask) =>
        currentTask.id === task.id
          ? {
              ...currentTask,
              completed: !currentTask.completed
            }
          : currentTask
      )
    );
  });

  taskList.appendChild(item);
});



  container.appendChild(taskList);

  return container;
}

// Attach ONE event listener to root
attachEventHub(root);

// Start reactive application
registerApp(TaskApp, root);
