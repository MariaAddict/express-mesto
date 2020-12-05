const User = require('../models/user');

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(404).send({ message: 'Пользователи не найдены' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Нет пользователя с таким id' });
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Некорректные данные пользователя' });
    return res.status(500).send({ message: 'Ошибка на сервере' });
  });

// eslint-disable-next-line no-unused-vars
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      upsert: true,
    })
    .then((data) => res.send(data))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(400).send({ message: 'Данные пользователя не обновились' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      upsert: true,
    })
    .then((data) => res.send(data))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(400).send({ message: 'Данные пользователя не обновились' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
