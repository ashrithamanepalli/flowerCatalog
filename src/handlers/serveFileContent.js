const fs = require('fs');
const mime = require('mime-types');

const alias = {
  '/': '/welcome.html'
};

const createFileContentServer = (root = './public') => {
  return (request, response, next) => {
    const { pathname } = request.url;
    const uri = alias[pathname] || pathname;
    const fileName = root + uri;

    fs.exists(fileName, (exists) => {
      if (exists) {
        response.setHeader('Content-type', mime.lookup(fileName));
        fs.readFile(fileName, (err, data) => {
          response.end(data);
        });
        return true;
      }
      next();
    });
  };
};

module.exports = { createFileContentServer };
