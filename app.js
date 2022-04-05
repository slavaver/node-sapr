const express = require('express');
const port = process.env.PORT || 3000;


const app = express();

const modelRoutes = require('./routes/modelRouter');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toLocaleTimeString()}`);
    next();
});

app.use('/models', modelRoutes);

const getContent = () => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Заголовок</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab at totam veniam accusantium molestias voluptatum
        voluptatem quisquam delectus sint aliquid natus libero esse, iste est in voluptate? Repellat, amet aut.</p>
</body>
</html>
`)

const PUBLIC_DIR = 'public';

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => res.send(getContent()));

app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));