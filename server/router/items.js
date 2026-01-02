const express = require("express");
const mongoose = require("mongoose");

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri);
const ItemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", ItemSchema);

const router = express.Router();

router.post("/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

router.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
