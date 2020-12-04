const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .populate('user')
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(404).send(err);
    });
};

const createCard = (req, res) => {
  const id = req.user._id;
  // eslint-disable-next-line object-curly-spacing
  const {name, link} = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch(() => {
      res.status(404).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch(() => {
      res.status(404).send({ message: 'Произошла ошибка' });
    });
};

module.exports = { getCards, createCard, deleteCard };
