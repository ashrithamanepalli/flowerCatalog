const fs = require('fs');

const { startServer } = require('./src/httpServer.js');
const { basicHandler } = require('./src/handler.js');
const { createFileContentServer } = require('./src/serveFileContent.js');
const { errorHandler } = require('./src/errorHandler.js');

const handle = (handlers, path = './public') => {
  return (request, response) => {
    handlers.some((handler) => handler(request, response, path));
  };
};

const setTemplateAndComments = (req, response) => {
  req.template = fs.readFileSync('./public/guestBookTemplate.html', 'utf-8');
  req.comments = JSON.parse(
    fs.readFileSync('./public/comments.json', 'utf-8'));
}

const PATH = process.argv.slice(2);

const handlers = [setTemplateAndComments,
  createFileContentServer(...PATH), basicHandler, errorHandler];

const PORT = 6789;
startServer(PORT, handle(handlers, ...PATH));
