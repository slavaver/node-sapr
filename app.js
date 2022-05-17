const express = require('express');
const cors = require('cors');
const modelRouter = require('./routes/modelRouter');


const app = express();

app.use(cors());

const PUBLIC_DIR = 'public';
app.use(express.static(PUBLIC_DIR));

app.use('/model', modelRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));