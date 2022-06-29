const { setDependencies } = require('./handlers/setDependenciesGuestBook.js');
const { guestbookHandler } = require('./handlers/guestbookHandler.js');
const { createFileContentServer } = require('./handlers/serveFileContent.js');
const { errorHandler } = require('./handlers/errorHandler.js');
const { createRouter } = require('./server/router.js');
const { logRequest } = require('./handlers/logRequest.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');

const app = ({ templatePath, commentsPath, rootDirectory }) => {

  const handlers = [
    parseSearchParams,
    logRequest,
    setDependencies(templatePath, commentsPath),
    guestbookHandler,
    createFileContentServer(rootDirectory),
    errorHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
