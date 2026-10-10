
const eventHandlers = new Map();
let nextHandlerId = 0;

export function registerHandler(handler) {
  const id = String(++nextHandlerId);
  eventHandlers.set(id, handler);
  return id;
}

export function attachEventHub(root) {
  root.addEventListener('click', (event) => {
    const target = event.target.closest('[data-event-id]');

    if (!target || !root.contains(target)) {
      return;
    }

    const handlerId = target.dataset.eventId;
    const handler = eventHandlers.get(handlerId);

    if (handler) {
      handler(event);
    }
  });
}

export function clearHandlers() {
  eventHandlers.clear();
}

