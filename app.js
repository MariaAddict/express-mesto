const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const path = require('path');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const UsersRouter = require('./routes/users.js');
const CardsRouter = require('./routes/cards.js');

app.use((req, res, next) => {
  req.user = {
    _id: '5fc9e686c8b23f0acc039a42',
  };

  next();
});
app.use('/', UsersRouter);
app.use('/', CardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening port:  ${PORT}`);
});
