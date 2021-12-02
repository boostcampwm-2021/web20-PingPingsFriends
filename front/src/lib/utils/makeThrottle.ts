const makeThrottle = (ms = 300) => {
  let id: NodeJS.Timeout;

  return (callback: () => void) => {
    if (id) {
      return;
    }

    id = setTimeout(() => {
      callback();
      clearTimeout(id);
    }, ms);
  };
};

export default makeThrottle;
