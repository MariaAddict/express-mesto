const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

router.get('/users', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  const fileReader = fs.createReadStream(filePath, { encoding: 'utf8' });

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  fileReader.pipe(res);
});

router.get('/users/:id', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  const fileReader = fs.createReadStream(filePath, { encoding: 'utf8' });

  const {id} = req.params;

fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then((data) => {return JSON.parse(data)})
    .then((data) => {
      const user = data.find((item) => {;
        return item._id === id;
      });
        res.send(user);

        if (!user) {
          res.status(404).send({ "message": "Нет пользователя с таким id" });
        }
    })
    .catch(err => {
        res.status(404).send({ "message": "Нет такого файла" });
    });
});

module.exports = router;