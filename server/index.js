const express = require('express');
const app = express();
require('dotenv').config();

//import Db
require('./src/db/mongoose');

//import modules;
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

app.use(morgan('short'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

//import routes
const todoRoutes = require('./src/routes/todo');
const subTaskRoutes = require('./src/routes/subtask');

app.use('/api', todoRoutes);
app.use('/api', subTaskRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to my api',
  });
});

app.listen(port, () => {
  console.log('Server is connected to localhost:' + port);
});
