const makeDebounce = (ms = 300) => {
  let id: NodeJS.Timeout;

  return (callback: () => void) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      callback();
      clearTimeout(id);
    }, ms);
  };
};

export default makeDebounce;
