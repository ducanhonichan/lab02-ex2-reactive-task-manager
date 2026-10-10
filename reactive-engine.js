
const stateStore = [];
let stateCursor = 0;

export function resetCursor() {
  stateCursor = 0;
}


export function useState(initialValue) {
  const currentIndex = stateCursor;

  if (currentIndex >= stateStore.length) {
    stateStore.push(initialValue);
  }

  const value = stateStore[currentIndex];

  function setState(newValue) {
    stateStore[currentIndex] =
      typeof newValue === 'function'
        ? newValue(stateStore[currentIndex])
        : newValue;
  }

  stateCursor++;

  return [value, setState];
}
