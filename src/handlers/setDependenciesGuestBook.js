const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const writeFile = (path, content) =>
  fs.writeFileSync(path, content, 'utf-8');

const readFile = (path) => fs.readFileSync(path, 'utf-8');

const setDependencies = (templatePath, commentsPath) => {

  const guestBook = new GuestBook(commentsPath,
    templatePath, writeFile, readFile);

  return (req, res) => {
    const { pathname } = req.url;

    if (pathname.startsWith('/guest-book')) {
      req.guestBook = guestBook;
    }

    return false;
  };
};

module.exports = { setDependencies };
