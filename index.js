const { startServer } = require('./src/server/httpServer.js');
const { handlers } = require('./src/app.js');

const PATH = process.argv.slice(2);
const PORT = 8765;

startServer(PORT, handlers(...PATH));
