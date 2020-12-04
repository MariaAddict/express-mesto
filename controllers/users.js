const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(404).send({ message: 'Нет такого файла' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.send(user))
  .catch((err) => {
    res.status(404).send(err);
  });

module.exports = {
  getUsers,
  getUser,
  createUser,
};
