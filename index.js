const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  server.close(() => {
    console.log('Closed express server');
    process.exit(0);
  });
});

server.on('connection', (socket) => {
  socket.setTimeout(5 * 1000); // Set a short timeout for idle connections
});
