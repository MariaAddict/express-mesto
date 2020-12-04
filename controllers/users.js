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
      }
      res.send(user);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(404).send({ message: 'Нет пользователя с таким id' });
    });
};

const createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.send(user))
  // eslint-disable-next-line consistent-return
  .catch((err) => {
    if (err.name === 'ErrorName') return res.status(400).send({ message: 'Некорректные данные пользователя' });
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
};
