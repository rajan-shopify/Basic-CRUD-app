const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (err) {
    res.status(500).send('Error fetching items');
  }
});

// GET form to create an item
router.get('/new', (req, res) => {
  res.render('new');
});

// POST a new item
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({ name, description });

  try {
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving item');
  }
});

// GET a single item to edit
router.get('/:id/edit', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item });
  } catch (err) {
    res.status(500).send('Error fetching item');
  }
});

// UPDATE an item
router.post('/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    await Item.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error updating item');
  }
});

// DELETE an item
router.get('/:id/delete', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
