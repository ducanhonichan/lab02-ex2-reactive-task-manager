
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

  renderApp();
}


  stateCursor++;

  return [value, setState];
}




let rootComponent = null;
let rootElement = null;

export function renderApp() {
  if (rootComponent === null) {
    return;
  }

  resetCursor();

  const output = rootComponent();

  if (rootElement !== null) {
    rootElement.replaceChildren(output);
  }
}

export function registerApp(component, root = null) {
  rootComponent = component;
  rootElement = root;
  renderApp();
}
