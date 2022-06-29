const { startServer } = require('./src/server/httpServer.js');
const { app } = require('./src/app.js');

const [...PATH] = process.argv.slice(2);

const appConfig = {
  templatePath: './src/template/guestBookTemplate.html',
  commentsPath: './data/comments.json',
  rootDirectory: PATH
};

const PORT = 8765;
startServer(PORT, app(appConfig));
