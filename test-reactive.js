
import { useState, registerApp } from './reactive-engine.js';

let renderCount = 0;
let updateCount;

function CounterApp() {
  const [count, setCount] = useState(0);

  renderCount++;
  updateCount = setCount;

  console.log(`Render ${renderCount}: count = ${count}`);
}

// Initial render
registerApp(CounterApp);

// Update state and trigger re-render
updateCount(5);

// Functional update and trigger re-render
updateCount(prev => prev + 10);

// Verify reactive rendering
console.assert(renderCount === 3, 'Render count failed');

console.log('Reactive rendering test completed.');
