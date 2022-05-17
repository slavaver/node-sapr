require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

async function createModel(modelData) {
    try {
        const { data, error } = await supabase
            .from('model')
            .insert(
                [modelData]
            )
        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

async function registerUser(userData) {
    try {
        const { data, error } = await supabase
            .from('user')
            .insert([
                userData,
            ])
        if (error.code == "23505") {
            throw "Такой пользователь существует"
        }
        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

async function loginUser(userData) {
    try {
        const { data, error } = await supabase
            .from('user')
            .select('email, password')
            .eq('email', userData.email)
        if (data.length == 0) throw "Не верный логин или пароль"
        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

module.exports = {
    createModel,
    registerUser,
    loginUser,
};