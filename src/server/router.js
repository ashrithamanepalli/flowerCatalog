const createRouter = (handlers) => {
  return (req, res) => {
    for (const handler of handlers) {
      if (handler(req, res)) {
        return true;
      }
    }
    return false;
  };
};

module.exports = { createRouter };
