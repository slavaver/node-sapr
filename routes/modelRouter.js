const {Router} = require('express');

const modelRouter = new Router();

modelRouter.get('/', (req, res) => res.send('model root'));
modelRouter.get('/:id', (req, res) => res.send(`/:id ${req.params.id}`));

module.exports = modelRouter;