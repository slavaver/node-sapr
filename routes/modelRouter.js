const {Router} = require('express');
const {upload} = require('../middlewares/multer.middleware')
const {postModel} = require('../controllers/model.controller')

const modelRouter = new Router();
modelRouter.post('/', upload, postModel)


module.exports = modelRouter;

