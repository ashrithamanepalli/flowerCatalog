const timeOutHandler = (req, res, next) => {
  if (req.url === '/time-out') {
    setTimeout(() => {
      res.end('done time out');
    }, 5000);
    return;
  }
  next();
};

module.exports = { timeOutHandler };
