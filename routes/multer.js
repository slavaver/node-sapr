const { createModel } = require('./model/supabase');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/models/');
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
        req.fileValidationError = "Только изображения";
        return cb(new Error('Только изображения'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const model = upload.single('model');

app.post('/form-submit', model, (req, res) => {
    const userName = req.body['userName'];
    model(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Выбирите изображение');
        } else if (err instanceof multer.MulterError) {
            return res.send(err)
        } else if (err) {
            return res.send(err)
        }
        const modelPath = req.file.path;
        createModel({
            userName,
            modelPath
        }).then(db_model => {console.log(db_model); res.json(JSON.stringify(db_model))});
    });
})

const multer = require('multer');
