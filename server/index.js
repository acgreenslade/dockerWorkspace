const cors = require('cors');
const express = require('express');
const path = require('path');

const weatherRouter = require('./router/weather.js');

const apiPort = process.env.API_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join('/app/client/build', 'index.html'));
});

app.use("/api", weatherRouter);

const server = app.listen(apiPort, () => {
  console.log(`App listening at http://localhost:${apiPort}`);
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
