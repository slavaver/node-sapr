const supabase = require('../configs/db.config');

async function insertModelDb(userName, modelPath) {
    try {
        const {data, error} = await supabase
            .from('model')
            .insert([
                {userName, modelPath},
            ]);
        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

module.exports = {
    insertModelDb
};
