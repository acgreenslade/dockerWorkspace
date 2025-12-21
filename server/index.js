const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('/app/client/build'));

app.get('*splat', (req, res) => {
  res.sendFile(path.join('/app/client/build', 'index.html'));
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
  socket.setTimeout(5 * 1000);
});
