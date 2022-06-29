const { startServer } = require('./src/server/httpServer.js');
const { app } = require('./src/app.js');

const PATH = process.argv.slice(2);
const PORT = 8765;

startServer(PORT, app(...PATH));
