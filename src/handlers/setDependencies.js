const fs = require('fs');

const setDependencies = (req, response) => {
  req.template = fs.readFileSync('./public/guestBookTemplate.html', 'utf-8');
  req.comments = JSON.parse(fs.readFileSync('./public/comments.json', 'utf-8'));
  req.writeFile = fs.writeFileSync;
  req.commentsFile = './public/comments.json';
};

module.exports = { setDependencies };
