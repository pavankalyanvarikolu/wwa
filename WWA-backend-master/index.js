const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerConfig = require('./swagger');

const app = express();

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5000;

// MongoDB connection
require('./db/conn');

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(bodyParser.json());
swaggerConfig(app);

app.use(require('./routes/auth'));
app.use(require('./routes/adminauth'));


app.get('/', (req, res) => {
  res.send('Welcome to Wednesdays Wicked Adventurs!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
