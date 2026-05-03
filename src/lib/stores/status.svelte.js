function createStatusStore() {
  let message = $state('');

  function update(text) {
    message = text;
  }

  function reset(greeting) {
    message = greeting;
  }

  return {
    get message() { return message; },
    update,
    reset
  };
}

export const statusStore = createStatusStore();
