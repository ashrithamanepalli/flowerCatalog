const { setDependencies } = require('./handlers/setDependenciesGuestBook.js');
const { guestbookHandler } = require('./handlers/guestbookHandler.js');
const { createFileContentServer } = require('./handlers/serveFileContent.js');
const { errorHandler } = require('./handlers/errorHandler.js');
const { createRouter, createAsyncRouter } = require('./server/router.js');
const { logRequest } = require('./handlers/logRequest.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { loginHandler, injectCookie,
  validateUser,
  addUser } = require('./handlers/cookieHandler.js');

const app = ({ templatePath, commentsPath, rootDirectory }) => {

  const handlers = [
    parseBodyParams,
    parseSearchParams,
    logRequest,
    setDependencies(templatePath, commentsPath),
    guestbookHandler,
    createFileContentServer(rootDirectory),
    errorHandler
  ];

  return createRouter(handlers);
};

const asyncApp = ({ templatePath, commentsPath, rootDirectory }) => {
  const handlers = [
    parseBodyParams,
    parseSearchParams,
    logRequest,
    injectCookie,
    loginHandler,
    validateUser,
    addUser,
    setDependencies(templatePath, commentsPath),
    guestbookHandler,
    createFileContentServer(rootDirectory),
    errorHandler
  ];

  return createAsyncRouter(handlers);
};

module.exports = { app, asyncApp };
