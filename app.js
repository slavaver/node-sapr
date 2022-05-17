const express = require('express');
const cors = require('cors');

const PUBLIC_DIR = 'public';

const app = express();

app.use(cors());
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({
    extended: true
}))

const users = require('./routes/users');
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));