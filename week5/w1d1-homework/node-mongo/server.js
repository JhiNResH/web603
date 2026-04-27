require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const inventoryRouter = require('./inventory.router');

const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/react-crud';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', inventoryRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Inventory API is running' });
});

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });
