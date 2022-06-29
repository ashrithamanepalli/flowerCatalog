const fs = require('fs');

const setDependencies = (req, res) => {
  const { pathname } = req.url;
  if (pathname === '/guest-book' || pathname === '/display-comments') {
    req.template = fs.readFileSync
      ('./src/template/guestBookTemplate.html', 'utf-8');
    req.comments = JSON.parse
      (fs.readFileSync('./data/comments.json', 'utf-8'));
    req.writeFile = fs.writeFileSync;
    req.commentsFile = './data/comments.json';
  }
  return false;
};

module.exports = { setDependencies };
