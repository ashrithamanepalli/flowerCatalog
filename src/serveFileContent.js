const fs = require('fs');

const contentTypes = {
  jpg: 'text/jpeg',
  html: 'text/html',
  pdf: 'application/pdf'
};

const getContentType = (fileName) => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
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

const createFileContentServer = (directory) => {
  const contents = readFiles(directory);

  return ({ uri }, response) => {
    let fileName = directory + uri;

    if (!fs.existsSync(fileName) || uri === '/') {
      return false;
    }

    response.setHeaders('Content-type', getContentType(fileName));
    response.send(contents[fileName]);
    return true;
  };

}

module.exports = { createFileContentServer };
