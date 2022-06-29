const fs = require('fs');
const path = require('path');

const contentTypes = {
  '.jpg': 'text/jpeg',
  '.html': 'text/html',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const getContentType = (extension) => {
  return contentTypes[extension] || 'text/plain';
};

const readFiles = (directory) => {
  let contents = {};
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = `${directory}/${file}`;
    if (!fs.existsSync(filePath)) {
      return false;
    }

    if (fs.statSync(filePath).isDirectory()) {
      contents = { ...contents, ...readFiles(filePath) };
    } else {
      const content = fs.readFileSync(filePath);
      contents[filePath] = content;
    }
  }
  )
  return contents;
}

const alias = {
  '/': '/welcome.html'
};

const createFileContentServer = (root) => {
  const contents = readFiles(root);

  return (request, response) => {
    const { pathname } = request.url;
    const uri = alias[pathname] || pathname;
    const fileName = root + uri;

    if (!fs.existsSync(fileName)) {
      return false;
    }

    response.setHeader('Content-type', getContentType(path.extname(fileName)));
    response.end(contents[fileName]);
    return true;
  };

}

module.exports = { createFileContentServer };
