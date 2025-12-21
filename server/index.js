const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

const api_port = process.env.API_PORT;
const db_uri = process.env.DB_URI;

const app = express();

mongoose.connect(db_uri);
const ItemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", ItemSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join('/app/client/build', 'index.html'));
});

app.post("/api/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

const server = app.listen(api_port, () => {
  console.log(`App listening at http://localhost:${api_port}`);
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
