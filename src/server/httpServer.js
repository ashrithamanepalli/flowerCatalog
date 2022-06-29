const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer((req, res) => { handler(req, res); });

  server.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

module.exports = { startServer };
