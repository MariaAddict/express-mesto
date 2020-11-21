const express = require('express');

const { PORT = 3000 } = process.env;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const UsersRouter = require('./routes/users.js');
const CardsRouter = require('./routes/cards.js');

app.use('/', UsersRouter);
app.use('/', CardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening port:  ${PORT}`);
});
