const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(404).send({ message: 'Нет такого файла' });
    });
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findOne({ id })
    .then((data) => JSON.parse(data))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.post('/users', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('body: ', req.body);
  return User.create({ ...req.body })
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
