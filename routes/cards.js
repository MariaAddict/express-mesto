const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  const fileReader = fs.createReadStream(filePath, { encoding: 'utf8' });

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  fileReader.pipe(res);
});

module.exports = router;