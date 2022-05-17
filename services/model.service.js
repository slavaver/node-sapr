const {insertModelDb} = require('../models/model.db');

const addModel = async (userName, modelPath) => {
    try {
        return await insertModelDb(userName, modelPath);
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = {
    addModel
}