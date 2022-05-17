const { Router } = require('express');
const bodyparser = require('body-parser')

const router = new Router();

router.get('/', (req, res) => res.send('model root'));
router.get('/:id', (req, res) => res.send(`/:id ${req.params.id}`));

module.exports = router;