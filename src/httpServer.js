const { createServer } = require('net');
const { parseRequestLine, parseHeaderLines } = require('./parseRequest');
const { Response } = require('./response.js');

const separateRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headerLines = parseHeaderLines(lines.slice(1));
  return { requestLine, headerLines };
};

const onRequest = (chunk, response, handler) => {
  const { requestLine, headerLines } = separateRequest(chunk);
  console.log(requestLine.method, requestLine.uri);

  const request = { ...requestLine, ...headerLines };
  handler(request, response);
};

const onConnection = (socket, handler) => {
  const response = new Response(socket);

  socket.on('error', (err) => console.log(err.message))
  socket.on('data', (chunk) =>
    onRequest(chunk.toString(), response, handler));
};

const startServer = (port, handler) => {
  const server = createServer((socket) => onConnection(socket, handler));

  server.listen(port, () => {
    console.log(`listening on ${port}`);
  });
};

module.exports = { startServer, onRequest, onConnection };
