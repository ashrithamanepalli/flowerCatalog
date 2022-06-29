const fs = require('fs');

const setDependencies = (templatePath, commentsPath) =>
  (req, res) => {

    const { pathname } = req.url;

    if (pathname.startsWith('/guest-book')) {
      req.writeFile = fs.writeFileSync;
      req.template = fs.readFileSync(templatePath, 'utf-8');
      req.comments = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
      req.commentsFile = commentsPath;
    }
    return false;
  };

module.exports = { setDependencies };
