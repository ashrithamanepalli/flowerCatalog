const logRequest = (req, res) => {
  console.log(req.method, req.url.pathname);
  return false;
};

module.exports = { logRequest };
