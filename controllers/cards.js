const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .populate('user')
    .then((data) => res.send(data))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(404).send(err);
    });
};

const createCard = (req, res) => {
  const id = req.user._id;
  // eslint-disable-next-line object-curly-spacing
  const {name, link} = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ErrorName') return res.status(400).send({ message: 'Неккоректные данные карточки' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Карточка не найдена' });
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((data) => res.send(data))
// eslint-disable-next-line consistent-return
  .catch((err) => {
    if (err.name === 'ErrorName') return res.status(404).send({ message: 'Карточка не лайкнулась' });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => res.send(data))
  // eslint-disable-next-line consistent-return
  .catch((err) => {
    if (err.name === 'ErrorName') return res.status(404).send({ message: 'Карточка не лайкнулась' });
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
