const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const UsersRouter = require('./routes/users.js');

app.use('/', UsersRouter);
app.use('*', (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`listening port:  ${PORT}`);
});
