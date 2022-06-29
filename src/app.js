const { setDependencies } = require('./handlers/setDependenciesGuestBook.js');
const { basicHandler } = require('./handlers/guestbookHandler.js');
const { createFileContentServer } = require('./handlers/serveFileContent.js');
const { errorHandler } = require('./handlers/errorHandler.js');
const { createRouter } = require('./server/router.js');

const app = (path) => {

  const handlers = [
    setDependencies,
    basicHandler,
    createFileContentServer(path),
    errorHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
