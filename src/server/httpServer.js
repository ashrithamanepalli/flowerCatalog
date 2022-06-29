const http = require('http');

const getEntries = (searchParams) => {
  const queryParams = {};
  const entries = searchParams.entries();

  for (const [query, value] of entries) {
    queryParams[query] = value;
  }

  return queryParams;
};

const startServer = (port, handler) => {

  const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    req.url = new URL(`http://${req.headers.host}` + req.url);
    req.queryParams = getEntries(req.url.searchParams);

    handler(req, res);
  });

  server.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

module.exports = { startServer };
