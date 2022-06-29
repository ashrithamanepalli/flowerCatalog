const { setDependencies } = require('./handlers/setDependenciesGuestBook.js');
const { basicHandler } = require('./handlers/guestbookHandler.js');
const { createFileContentServer } = require('./handlers/serveFileContent.js');
const { errorHandler } = require('./handlers/errorHandler.js');


const handlers = (path = './public') => {

  const handlers = [setDependencies, basicHandler,
    createFileContentServer(path), errorHandler
  ];

  return (req, res) => {
    for (const handler of handlers) {
      if (handler(req, res)) {
        return true;
      }
    }
    return false;
  }
};

module.exports = { handlers };
