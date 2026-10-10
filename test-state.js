
import { resetCursor, useState } from './reactive-engine.js';

// Test 1: Initialize state
resetCursor();

const [count, setCount] = useState(0);
console.log('Initial count:', count);

// Test 2: Update state
setCount(5);

resetCursor();
const [updatedCount, setUpdatedCount] = useState(0);
console.log('Updated count:', updatedCount);

// Test 3: Functional update
setUpdatedCount(prev => prev + 10);

resetCursor();
const [finalCount] = useState(0);
console.log('Final count:', finalCount);

// Verify results
console.assert(count === 0, 'Initial state failed');
console.assert(updatedCount === 5, 'State update failed');
console.assert(finalCount === 15, 'Functional update failed');

console.log('State engine tests completed.');

