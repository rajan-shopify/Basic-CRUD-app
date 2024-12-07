const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const path = require('path');
const app = express();

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/userReadWrite');
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Port
const PORT = process.env.PORT || 3000;

app.use('/', itemRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});