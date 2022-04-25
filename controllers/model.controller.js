const { addModel } = require('../services/model.service')

const postModel = async (req, res, next) => {
    const {userName} = req.body;
    const modelPath = req.file.path;
    try {
        await addModel(userName, modelPath);
        res.sendStatus(201);
        next();
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    postModel
}